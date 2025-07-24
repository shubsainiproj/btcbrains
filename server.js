const express = require('express');
const path = require('path');
const app = express();

// Use Render's PORT or default to 3000 (useful for local dev)
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// For SPA (optional fallback if using hash routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`BTC Address Tool Pro running on port ${PORT}`);
});
