import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, getWeatherFilters, getWeatherDataAsync } from '../../features/redux/weatherSlice';
import { setMsgAsync, Message } from '../../features/redux/notificationsSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WeatherFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getWeatherFilters);
  const [localFilters, setLocalFilters] = useState(filters);
  const [applyDisabled, setApplyDisabled] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value
    });
  };

  const handleDateChange = (date, name) => {
    setLocalFilters({
      ...localFilters,
      [name]: date
    });
  };

  useEffect(() => {
    // Check if both dates are selected and start date is greater than end date
    if (localFilters.fromDate && localFilters.toDate) {
      if (localFilters.fromDate > localFilters.toDate) {
        setApplyDisabled(true);
        dispatch(setMsgAsync(new Message("End time should be greater than start time.").getAction()));
      } else {
        setApplyDisabled(false);
      }
    } else {
      setApplyDisabled(false);
    }
  }, [localFilters.fromDate, localFilters.toDate, dispatch]);

  const applyFilters = () => {
    if (!applyDisabled) {
      dispatch(setFilters(localFilters));
      dispatch(getWeatherDataAsync(localFilters));
    }
  };

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-4">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={localFilters.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label>Temperature Min (°C)</label>
          <input
            type="number"
            className="form-control"
            name="temperatureMin"
            value={localFilters.temperatureMin}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label>Temperature Max (°C)</label>
          <input
            type="number"
            className="form-control"
            name="temperatureMax"
            value={localFilters.temperatureMax}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <label>From Date and Time</label>
          <DatePicker
            selected={localFilters.fromDate}
            onChange={(date) => handleDateChange(date, 'fromDate')}
            className="form-control"
            dateFormat="yyyy-MM-dd h:mm aa"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            isClearable
            placeholderText="Select a start date and time"
          />
        </div>
        <div className="col-md-6">
          <label>To Date and Time</label>
          <DatePicker
            selected={localFilters.toDate}
            onChange={(date) => handleDateChange(date, 'toDate')}
            className="form-control"
            dateFormat="yyyy-MM-dd h:mm aa"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            isClearable
            placeholderText="Select an end date and time"
          />
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={applyFilters} disabled={applyDisabled}>
        Apply Filters
      </button>
    </div>
  );
};

export default WeatherFilters;
