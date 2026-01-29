const Movie = require('../models/Movie');

/**
 * A simple in-memory queue to demonstrate "Lazy Insertion"
 * In a real production environment, this would use Redis + BullMQ
 */
class MovieQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  // Add movie data to the queue
  async enqueue(movieData) {
    return new Promise((resolve) => {
      this.queue.push({ movieData, resolve });
      console.log(`[Queue] Item added. Current size: ${this.queue.length}`);

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  // Background processor
  async processQueue() {
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { movieData, resolve } = this.queue.shift();

      try {
        console.log(`[Queue] Processing movie: ${movieData.title}`);
        // Simulate some processing time
        await new Promise(r => setTimeout(r, 1000));

        const movie = await Movie.create(movieData);
        resolve({ success: true, data: movie });
        console.log(`[Queue] Successfully inserted: ${movieData.title}`);
      } catch (error) {
        console.error(`[Queue] Error inserting movie: ${movieData.title}`, error);
        resolve({ success: false, error: error.message });
      }
    }

    this.isProcessing = false;
  }
}

module.exports = new MovieQueue();
