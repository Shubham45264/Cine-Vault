const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');
const User = require('./models/User');

dotenv.config();

const movies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    releaseDate: new Date("1994-09-22"),
    duration: 142,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
    genre: ["Drama", "Crime"]
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    releaseDate: new Date("1972-03-24"),
    duration: 175,
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800",
    genre: ["Drama", "Crime"]
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    releaseDate: new Date("2008-07-18"),
    duration: 152,
    posterUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800",
    genre: ["Action", "Crime", "Drama"]
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 8.8,
    releaseDate: new Date("2010-07-16"),
    duration: 148,
    posterUrl: "https://images.unsplash.com/photo-1535016120720-40c646bebbfc?auto=format&fit=crop&q=80&w=800",
    genre: ["Action", "Adventure", "Sci-Fi"]
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 8.9,
    releaseDate: new Date("1994-10-14"),
    duration: 154,
    posterUrl: "https://images.unsplash.com/photo-1598899139111-237d135ba92b?auto=format&fit=crop&q=80&w=800",
    genre: ["Crime", "Drama"]
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.7,
    releaseDate: new Date("2014-11-07"),
    duration: 169,
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
    genre: ["Adventure", "Drama", "Sci-Fi"]
  }
];

const seedData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);

    // Clear existing data
    await Movie.deleteMany();
    await User.deleteMany();

    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@gmail.com',
      username: 'admin_user',
      password: 'adminpassword',
      role: 'admin'
    });

    // Create regular user
    await User.create({
      name: 'Regular User',
      email: 'user@gmail.com',
      username: 'regular_user',
      password: 'userpassword',
      role: 'user'
    });

    // Insert movies
    await Movie.insertMany(movies);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
