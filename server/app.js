const express = require('express');
const app = express();

const weatherDataRouter = require('./routes/weatherData');

// Middleware to parse JSON requests
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send();
});

// Weather data router
app.use('/api/weather', weatherDataRouter);

// Error handling middleware (optional, you can add your own)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
