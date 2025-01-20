// Import the required modules
const express = require('express');
const app = express();

// Set the port number (default to 3000 if not provided)
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Server!');
});

// Example of another GET route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Example of a POST route
app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received!', receivedData: data });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
