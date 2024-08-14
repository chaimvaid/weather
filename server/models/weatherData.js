'use strict';

module.exports = (sequelize, DataTypes) => {
  const WeatherData = sequelize.define('WeatherData', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    temperature_unit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    wind_speed: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    wind_direction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    short_forecast: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    detailed_forecast: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'weather_data',
    timestamps: false,
  });

  WeatherData.associate = function(models) {
    // Define associations here if needed
  };

  return WeatherData;
};
