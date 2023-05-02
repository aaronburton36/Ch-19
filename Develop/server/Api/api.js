// Import required packages
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Define port for the app
const PORT = process.env.PORT || 3001;

// Set up middleware for parsing JSON data
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Define routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/thoughts', require('./routes/thoughtRoutes'));

// Set up default route for handling undefined routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Sync Mongoose models to MongoDB database and start server
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB database');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
