const Movie = require('../models/Movie');

// @desc    Get all movies (with pagination)
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const total = await Movie.countDocuments();
    const movies = await Movie.find().skip(skip).limit(limit).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: movies.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: movies
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Search movies
// @route   GET /api/movies/search
// @access  Public
exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, error: 'Please provide a search term' });
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    });

    res.status(200).json({ success: true, count: movies.length, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get sorted movies
// @route   GET /api/movies/sorted
// @access  Public
exports.getSortedMovies = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    const sortField = sortBy || 'createdAt';
    const sortOrder = order === 'desc' ? -1 : 1;

    const movies = await Movie.find().sort({ [sortField]: sortOrder });

    res.status(200).json({ success: true, count: movies.length, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const movieQueue = require('../utils/movieQueue');

// @desc    Create new movie (Lazy Insertion via Queue)
// @route   POST /api/movies
// @access  Private (Admin)
exports.createMovie = async (req, res) => {
  try {
    // We add to queue for lazy insertion
    // In a real high-scale app, we might respond 'Accepted' immediately
    // but here we wait for the queue to resolve to maintain current frontend flow
    const result = await movieQueue.enqueue(req.body);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private (Admin)
exports.updateMovie = async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private (Admin)
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    await movie.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
