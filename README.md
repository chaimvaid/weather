Here’s a `README.md` file based on the structure and content you’ve provided:


## Services Overview

1. **Database Service (`db`)**:
   - A PostgreSQL database service that stores processed weather data.

2. **Weather Data Fetching and Processing Service (`weather_job`)**:
   - A Python service that fetches weather data from the National Weather Service (NWS) API, processes the data, and stores it in the PostgreSQL database. The service runs as a cron job that executes every minute.

3. **Backend API Service (`server`)**:
   - A Node.js/Express service that provides a RESTful API to interact with the weather data stored in the database. It handles requests from the client application and returns the requested data.

4. **Frontend Service (`client`)**:
   - A React-based web application that provides a user interface for visualizing the weather data. Users can apply filters, sort data, and paginate through the results.

## Setup and Running the Project Locally

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your local machine.

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chaimvaid/weather
   cd weather
   ```

2. **Set Up Environment Variables**:
   - Ensure that `.env` files are present in the `weather_job`, `server`, and `client` directories with the necessary environment variables. Example `.env` files might include:
   
   **Example `.env` for `weather_job`**:
   ```env
   DATABASE_URL=postgres://weatheruser:weatherpass@db:5432/weatherdb
   ```

   **Example `.env` for `server`**:
   ```env
   DATABASE_URL=postgres://weatheruser:weatherpass@db:5432/weatherdb
   ```

   **Example `.env` for `client`**:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

3. **Run the Application**:
   - Start all services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**:
   - **API**: The backend API will be available at `http://localhost:8000/api`.
   - **Client**: The frontend web application will be available at `http://localhost:3000`.

## API Documentation

### Base URL

`http://localhost:8000/api`

### Endpoints

#### 1. **Get Weather Data**
   - **Endpoint**: `/api/weather`
   - **Method**: `GET`
   - **Description**: Retrieves all weather data entries from the database.

   **Query Parameters**:
   - `city` (optional): Filter by city name.
   - `temperatureMin` (optional): Filter by minimum temperature.
   - `temperatureMax` (optional): Filter by maximum temperature.
   - `fromDate` (optional): Filter by start date (in `YYYY-MM-DD` format).
   - `toDate` (optional): Filter by end date (in `YYYY-MM-DD` format).
   - `page` (optional): Page number for pagination.
   - `limit` (optional): Number of records per page.

   **Response**:
   ```json
   [
     {
       "city": "New York",
       "temperature": 25.5,
       "temperature_unit": "Celsius",
       "wind_speed": 10.5,
       "wind_direction": "NW",
       "short_forecast": "Sunny",
       "detailed_forecast": "Clear skies throughout the day",
       "date": "2023-08-01T14:00:00Z"
     },
     ...
   ]
   ```

   **Example Request**:
   ```bash
   curl -X GET "http://localhost:8000/api/weather?city=New+York&temperatureMin=20&temperatureMax=30"
   ```

## Project Structure

- **weather_job**: Contains the Python code for fetching and processing weather data.
- **server**: Contains the Node.js/Express backend API code.
- **client**: Contains the React frontend code.
- **data**: Directory for storing data files like `cities.json`.
- **docker-compose.yml**: Docker Compose configuration for orchestrating all services.

## Notes

- Ensure that the `cities.json` file is properly configured in the `/data` directory.
- The weather data fetching service runs every minute as per the cron job configuration.
- This project allows flexible data manipulation using Pandas DataFrames before storing data in the PostgreSQL database.

