const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Additional middleware or routes


module.exports = app;