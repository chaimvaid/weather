import os
import json
import requests
import pandas as pd
from datetime import datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError

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

# Replace 'postgres://' with 'postgresql://' for SQLAlchemy compatibility
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

def fetch_weather_data(gridpoint):
    """
    Fetches weather data from the National Weather Service API for a given gridpoint.
    """
    try:
        url = f'{BASE_URL}/gridpoints/{gridpoint}/forecast'
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()  # Raise an error for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data for gridpoint {gridpoint}: {e}")
        return None

def preprocess_weather_data(raw_data, city):
    """
    Extracts relevant weather data fields from the raw API response.
    """
    try:
        periods = raw_data['properties']['periods']
        first_period = periods[0]
        
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
    """
    last_hour_data = fetch_last_hour_data(city)
    if last_hour_data is not None and not last_hour_data.empty:
        df['temperature'] = df['temperature'].fillna(last_hour_data['temperature'].mean())
        df['wind_speed'] = df['wind_speed'].fillna(last_hour_data['wind_speed'].mean())
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
