
const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);
const db = require('../../models'); // Assuming Sequelize models are initialized here

describe('GET /weather', () => {
  beforeAll(async () => {
    // Run migrations and prepare the test database
    await db.sequelize.sync({ force: true });

    // Seed the database with test data
    await db.WeatherData.bulkCreate([
      {
        city: 'New York',
        temperature: 25.5,
        temperature_unit: 'Celsius',
        wind_speed: 10.5,
        wind_direction: 'NW',
        short_forecast: 'Sunny',
        detailed_forecast: 'Clear skies throughout the day',
        date: new Date()
      },
      {
        city: 'Los Angeles',
        temperature: 30.0,
        temperature_unit: 'Celsius',
        wind_speed: 5.0,
        wind_direction: 'W',
        short_forecast: 'Hot',
        detailed_forecast: 'Sunny with no clouds',
        date: new Date()
      }
    ]);
  });

  afterAll(async () => {
    // Clean up the database after all tests
    await db.sequelize.close();
  });

  it('should return all weather data', async () => {
    const res = await request.get('/weather');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('city', 'New York');
    expect(res.body[1]).toHaveProperty('city', 'Los Angeles');
  });

  it('should return data with the correct fields', async () => {
    const res = await request.get('/weather');

    expect(res.status).toBe(200);
    res.body.forEach(weatherData => {
      expect(weatherData).toHaveProperty('city');
      expect(weatherData).toHaveProperty('temperature');
      expect(weatherData).toHaveProperty('temperature_unit');
      expect(weatherData).toHaveProperty('wind_speed');
      expect(weatherData).toHaveProperty('wind_direction');
      expect(weatherData).toHaveProperty('short_forecast');
      expect(weatherData).toHaveProperty('detailed_forecast');
      expect(weatherData).toHaveProperty('date');
    });
  });
});
