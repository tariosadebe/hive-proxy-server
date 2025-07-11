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

app.post('/hive-bridge', async (req, res) => {
  try {
    const response = await fetch('https://rpc.ecency.com/hive-bridge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Remote API responded with status ${response.status}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy fetch error:', error);
    res.status(502).json({ error: 'Failed to fetch from https://rpc.ecency.com/hive-bridge' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 