# Weather Data Processing Microservices Project

## Project Overview

This project is designed to process, store, and serve weather data using a microservices architecture. The system will consist of three primary components:

1. **Python Data Processing Service**: Responsible for fetching, processing, and storing weather data.
2. **Node.js Backend Service (To be developed)**: Will serve as the API layer, providing RESTful endpoints to access the weather data.
3. **React Frontend Service (To be developed)**: A user-friendly interface to visualize the weather data.

## Technology Stack

### 1. Python (Data Processing)
- **Rationale**: Python is chosen for data processing due to its extensive ecosystem of libraries for data manipulation, machine learning, and scientific computing (e.g., Pandas, NumPy, Scikit-learn). These tools make it easy to handle, clean, and analyze large datasets, making Python an ideal choice for the data processing service.

### 2. Node.js with Express (Backend Service) - *To be developed*
- **Rationale**: Node.js with Express will be used to build the backend service. Node.js is known for its non-blocking, event-driven architecture, which is well-suited for building scalable and high-performance APIs. Express, a minimal and flexible Node.js web application framework, will provide a robust set of features for building RESTful services.

### 3. React with Bootstrap (Frontend Service) - *To be developed*
- **Rationale**: React will be used for building the frontend service due to its component-based architecture, which allows for reusable UI components. Bootstrap will be integrated to ensure responsive and modern design out of the box.

## Current Project Status

### Python Data Processing Service

The Python service is currently responsible for:

- **Fetching Weather Data**: Using the National Weather Service API to gather weather data for specified cities.
- **Processing Data**: Cleaning and filling in missing values using the latest available data.
- **Storing Data**: Persisting the processed data into a PostgreSQL database.

The service is scheduled to run every minute to keep the weather data up-to-date.

### Backend and Frontend Services

The backend and frontend services are planned but have not yet been implemented. The backend will provide RESTful endpoints for the frontend to consume, and the frontend will provide a visual interface for users to interact with the weather data.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.
- A valid API key for the National Weather Service API.

### Setting Up the Python Service

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/weather-data-microservices.git
   cd weather-data-microservices
