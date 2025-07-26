const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔒 Optional: Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// 🔁 Force HTTPS on Render
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// 🌐 Serve all static files from current directory
app.use(express.static(__dirname));

// 🧭 Fallback route for SPAs or undefined paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ BTC Address Tool Pro running on port ${PORT}`);
});
