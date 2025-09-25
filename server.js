const express = require('express');
const bodyParser = require('body-parser');
const templateRoutes = require('./routes/templateRoutes');

const app = express();
app.use(bodyParser.json());

// API Routes
app.use('/api/templates', templateRoutes);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
