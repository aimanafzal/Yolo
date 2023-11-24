const express = require('express');
const app = express();
// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Interceptor for modifying response
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`Response sent with status ${res.statusCode}, ${res.statusMessage}`);
    // Modify or log the response here if needed
  });
  next();
});

module.exports = app;

// Other middleware or routes

