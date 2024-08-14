import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherDataAsync, getWeatherData, getLoadingWeatherData, getWeatherFilters, getPagination, setCurrentPage } from '../../features/redux/weatherSlice';
import WeatherFilters from '../../components/ui/WeatherFilters';
import PaginationControls from '../../components/ui/PaginationControls';

const WeatherPage = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector(getWeatherData);
  const loading = useSelector(getLoadingWeatherData);
  const filters = useSelector(getWeatherFilters);
  const { currentPage, itemsPerPage, totalItems } = useSelector(getPagination);

  useEffect(() => {
    dispatch(getWeatherDataAsync({ filters, page: currentPage }));
  }, [dispatch, filters, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Weather Data</h1>
      
      <WeatherFilters />
      
      <PaginationControls
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setCurrentPage={handlePageChange}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">City</th>
            <th scope="col">Temperature (°C)</th>
            <th scope="col">Wind Speed (km/h)</th>
            <th scope="col">Wind Direction</th>
            <th scope="col">Short Forecast</th>
            <th scope="col">Detailed Forecast</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((weather, index) => (
            <tr key={index}>
              <td>{weather.city}</td>
              <td>{weather.temperature}</td>
              <td>{weather.wind_speed}</td>
              <td>{weather.wind_direction}</td>
              <td>{weather.short_forecast}</td>
              <td>{weather.detailed_forecast}</td>
              <td>{new Date(weather.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <PaginationControls
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setCurrentPage={handlePageChange}
      />
    </div>
  );
};

export default WeatherPage;
