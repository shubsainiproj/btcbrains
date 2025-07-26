const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(helmet()); // Full security headers (HSTS, CSP, etc.)
app.use(morgan('combined')); // Detailed logging
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d', // Cache static assets for 1 day
  etag: true
}));

// Conditional HTTPS redirect in production
if (ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', environment: ENV });
});

// Serve index.html for specific routes
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ BTC Address Tool Pro running on port ${PORT} in ${ENV} mode`);
});
