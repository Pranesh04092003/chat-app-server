
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
require('dotenv').config(); 
const socketServer = require('./socket'); 

// Import routes
const authRoutes = require('./routes/auth'); 

const app = express();
const server = http.createServer(app);
const io = socketServer(server); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); 

// Route to check server status
app.get('/', (req, res) => {
    res.send('Server running good');
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
