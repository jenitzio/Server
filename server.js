const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors());   // Restrict this to your frontend URL in production
app.use(express.json());

// Proxy Endpoint
app.get('/fetch', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('URL is required');

    try {
        const response = await axios.get(targetUrl);
        // In a real 'safe' browser, you would sanitize the HTML here
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching site safely');
    }
});

app.listen(PORT, () => console.log(`Secure Proxy running on port ${PORT}`));
