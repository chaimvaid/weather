const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { WeatherData } = require('../models');

// GET /weather - Fetch all weather data rows with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { city, temperatureMin, temperatureMax, fromDate, toDate, page = 1, itemsPerPage = 10 } = req.query;

    const whereClause = {};

    if (city) {
      whereClause.city = { [Op.iLike]: `%${city}%` };
    }
    if (temperatureMin) {
      whereClause.temperature = { [Op.gte]: parseFloat(temperatureMin) };
    }
    if (temperatureMax) {
      whereClause.temperature = whereClause.temperature || {};
      whereClause.temperature[Op.lte] = parseFloat(temperatureMax);
    }
    if (fromDate) {
      whereClause.date = { [Op.gte]: new Date(fromDate) };
    }
    if (toDate) {
      whereClause.date = whereClause.date || {};
      whereClause.date[Op.lte] = new Date(toDate);
    }

    const offset = (page - 1) * itemsPerPage;
    const { rows, count } = await WeatherData.findAndCountAll({
      where: whereClause,
      limit: parseInt(itemsPerPage),
      offset: offset
    });

    res.status(200).json({ data: rows, totalItems: count });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
