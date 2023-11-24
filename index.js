const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const middleware = require('./MIDDLEWARE/middleware');
const errorHandler = require('./ERROR_HANDLING/errorHandling');
const app = express();

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(middleware);
app.use(errorHandler);
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Configure Passport local strategy for authentication
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Implement your authentication logic here
    // Check username and password against your database
    // Call done() with appropriate parameters
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Fetch user by id and call done() with the user object
});

// Login route
app.post('/login', passport.authenticate('local'), (req, res) => {
  // Upon successful login
  res.json({ message: 'Login successful', user: req.user });
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

// Other routes and actions (GET, POST, PUT, PATCH, DELETE) would require authentication middleware
// For example:
app.get('/profile', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

app.listen(PORT, HOST, () => {
  console.log(`Server started on ${process.env.HOST}:${process.env.PORT}`);
});

