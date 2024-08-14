import os
import json
import requests
import pandas as pd
from datetime import datetime, timedelta
from sqlalchemy import create_engine, exc
from dotenv import load_dotenv
import time

# Load environment variables from the .env file
load_dotenv('/app/.env')

# Base URL for the National Weather Service API
BASE_URL = 'https://api.weather.gov'

# The User-Agent header is required for the NWS API
HEADERS = {
    'User-Agent': '(myweatherapp.com, contact@myweatherapp.com)',
    'Accept': 'application/geo+json'
}

# Path to the cities JSON file
CITIES_FILE = '/data/cities.json'

# Load cities from the JSON file
try:
    with open(CITIES_FILE, 'r') as file:
        CITIES = json.load(file)
except FileNotFoundError:
    print(f"Error: Cities file not found at {CITIES_FILE}")
    CITIES = {}
except json.JSONDecodeError:
    print(f"Error: Failed to parse the cities JSON file at {CITIES_FILE}")
    CITIES = {}

# Database URL from environment variable
DATABASE_URL = os.getenv('DATABASE_URL')

# Check if DATABASE_URL is not None
if not DATABASE_URL:
    raise exc.ArgumentError("DATABASE_URL environment variable not set.")

# Replace 'postgres://' with 'postgresql://' for SQLAlchemy compatibility
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

def fetch_weather_data(gridpoint, retries=3, backoff_factor=0.3):
    """
    Fetches weather data from the National Weather Service API for a given gridpoint.
    Implements retry logic with exponential backoff to handle rate limits.
    """
    url = f'{BASE_URL}/gridpoints/{gridpoint}/forecast'
    
    for attempt in range(retries):
        try:
            response = requests.get(url, headers=HEADERS)
            response.raise_for_status()  # Raise an error for bad status codes
            return response.json()
        except requests.exceptions.HTTPError as e:
            if response.status_code == 429:  # Rate limit error
                backoff_time = backoff_factor * (2 ** attempt)
                print(f"Rate limit hit, retrying in {backoff_time} seconds...")
                time.sleep(backoff_time)
            else:
                print(f"HTTP error fetching data for gridpoint {gridpoint}: {e}")
                break
        except requests.exceptions.RequestException as e:
            print(f"Error fetching data for gridpoint {gridpoint}: {e}")
            break
    return None

def preprocess_weather_data(raw_data, city):
    """
    Extracts relevant weather data fields from the raw API response.
    """
    try:
        periods = raw_data['properties']['periods']
        first_period = periods[0]
        
        # Ensure data validity
        if first_period.get('temperature') is None or first_period.get('windSpeed') is None:
            print(f"Invalid data received for city {city}. Skipping...")
            return None
        
        processed_data = {
            'city': city,
            'date': datetime.utcnow(),  # Store UTC time
            'temperature': first_period.get('temperature'),
            'temperature_unit': first_period.get('temperatureUnit'),
            'wind_speed': first_period.get('windSpeed'),
            'wind_direction': first_period.get('windDirection'),
            'short_forecast': first_period.get('shortForecast'),
            'detailed_forecast': first_period.get('detailedForecast')
        }
        
        return processed_data
    except KeyError as e:
        print(f"Error processing data: Missing key {e}")
        return None

def fetch_last_hour_data(city):
    """
    Fetches the last hour of data for a specific city from the database.
    Note:
    - We are not performing aggregation in SQL to provide the ability to manipulate data using DataFrame (df) operations.
    """
    try:
        last_hour = datetime.utcnow() - timedelta(hours=1)
        query = '''
            SELECT temperature, wind_speed, wind_direction
            FROM weather_data
            WHERE city = %s AND date > %s
        '''
        df = pd.read_sql(query, engine, params=(city, last_hour))
        
        # Clean and convert wind_speed to numeric
        df['wind_speed'] = df['wind_speed'].str.extract('(\d+)').astype(float)
        
        return df
    except SQLAlchemyError as e:
        print(f"Error fetching last hour data: {e}")
        return None

def fill_missing_data(df, city):
    """
    Fills missing values in the DataFrame using the mean of the closest available data.
    If data is missing, fetches the mean of the last hour for the specific city.
    
    Note:
    - We drop NaN values before calculating the mean to prevent errors.
    - In cases where there are a lot of missing values, using the median might be better than the mean.
    - Another approach could be to use the last valid value (forward-fill) to fill missing data points.
    """
    last_hour_data = fetch_last_hour_data(city)
    if last_hour_data is not None and not last_hour_data.empty:
        df['temperature'] = df['temperature'].fillna(last_hour_data['temperature'].dropna().mean())
        df['wind_speed'] = df['wind_speed'].fillna(last_hour_data['wind_speed'].dropna().mean())
        df['wind_direction'] = df['wind_direction'].fillna(last_hour_data['wind_direction'].mode()[0])
    else:
        print(f"No data available from the last hour for {city}. Unable to fill missing values.")
    
    # Fill categorical/text data
    df['wind_direction'] = df['wind_direction'].fillna(df['wind_direction'].mode()[0])
    df['short_forecast'] = df['short_forecast'].fillna(df['short_forecast'].mode()[0])
    df['detailed_forecast'] = df['detailed_forecast'].fillna(df['detailed_forecast'].mode()[0])
    
    return df

def store_data(df):
    """
    Stores the processed weather data into the PostgreSQL database.
    """
    try:
        with engine.connect() as connection:
            df.to_sql('weather_data', connection, if_exists='append', index=False)
    except SQLAlchemyError as e:
        print(f"Error storing data: {e}")

if __name__ == "__main__":
    if not CITIES:
        print("No cities to process. Exiting.")
    else:
        weather_data_list = []

        for city, gridpoint in CITIES.items():
            raw_weather_data = fetch_weather_data(gridpoint)
            if raw_weather_data:
                processed_data = preprocess_weather_data(raw_weather_data, city)
                if processed_data:
                    weather_data_list.append(processed_data)

        if weather_data_list:
            # Convert list of dictionaries to DataFrame
            df = pd.DataFrame(weather_data_list)

            # Fill missing data using last hour's data
            for city in df['city'].unique():
                city_df = df[df['city'] == city].copy()
                city_df = fill_missing_data(city_df, city)
                store_data(city_df)
            print("Data stored successfully.")
