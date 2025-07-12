const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Allow only your frontend origin to access the proxy (adjust as needed)
app.use(cors({
  origin: 'http://localhost:3000' // or your frontend domain
}));

app.use(express.json());

// Add a GET endpoint for testing
app.get('/hive-bridge', (req, res) => {
  res.json({
    message: 'Hive Bridge Proxy is running! ✅',
    note: 'This endpoint only accepts POST requests for actual API calls',
    timestamp: new Date().toISOString(),
    endpoints: {
      post: '/hive-bridge - for actual Hive API calls',
      get: '/hive-bridge - for testing (this response)'
    }
  });
});

app.post('/hive-bridge', async (req, res) => {
  try {
    console.log('Received POST request to /hive-bridge:', {
      body: req.body,
      timestamp: new Date().toISOString()
    });

    const response = await fetch('https://api.deathwing.me/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      console.error('Remote API error:', response.status, response.statusText);
      return res.status(response.status).json({ 
        error: `Remote API responded with status ${response.status}`,
        details: response.statusText
      });
    }

    const data = await response.json();
    console.log('Successfully proxied request to Hive API');
    res.json(data);
  } catch (error) {
    console.error('Proxy fetch error:', error);
    res.status(502).json({ 
      error: 'Failed to fetch from Hive API (api.deathwing.me)',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Add a root endpoint for health checks
app.get('/', (req, res) => {
  res.json({
    message: 'Hive Proxy Server is running! ✅',
    endpoints: {
      'GET /': 'Health check (this response)',
      'GET /hive-bridge': 'Test endpoint',
      'POST /hive-bridge': 'Proxy to Hive API'
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Health check: http://localhost:${port}/`);
  console.log(`Test endpoint: http://localhost:${port}/hive-bridge`);
}); 