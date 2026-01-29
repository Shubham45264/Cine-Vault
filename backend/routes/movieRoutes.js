const express = require('express');
const {
  getMovies,
  searchMovies,
  getSortedMovies,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getMovies);
router.get('/search', searchMovies);
router.get('/sorted', getSortedMovies);

// Protected Admin routes
router.post('/', protect, authorize('admin'), createMovie);
router.put('/:id', protect, authorize('admin'), updateMovie);
router.delete('/:id', protect, authorize('admin'), deleteMovie);

module.exports = router;
