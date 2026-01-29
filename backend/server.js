const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const auth = require('./routes/authRoutes');
const movies = require('./routes/movieRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS with more flexibility
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'].filter(Boolean);
const corsOptions = {
  origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Log all incoming requests (helpful for debugging Railway)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Origin: ${req.get('origin')}`);
  next();
});

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', auth);
app.use('/api/movies', movies);

// Basic route for health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
