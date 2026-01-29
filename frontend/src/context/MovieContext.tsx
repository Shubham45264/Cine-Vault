import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { Movie } from "@/types/movie";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface MovieContextType {
  movies: Movie[];
  isLoading: boolean;
  addMovie: (movie: Omit<Movie, "id">) => Promise<boolean>;
  updateMovie: (id: string, movie: Partial<Movie>) => Promise<boolean>;
  deleteMovie: (id: string) => Promise<boolean>;
  getMovieById: (id: string) => Movie | undefined;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/movies');
      if (response.data.success) {
        // Map _id from mongo to id for frontend
        const mappedMovies = response.data.data.map((movie: any) => ({
          ...movie,
          id: movie._id
        }));
        setMovies(mappedMovies);
      }
    } catch (error) {
      toast.error("Failed to fetch movies");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const addMovie = useCallback(async (movie: Omit<Movie, "id">) => {
    try {
      const response = await api.post('/movies', movie);
      if (response.data.success) {
        toast.success("Movie added!");
        fetchMovies();
        return true;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to add movie");
    }
    return false;
  }, [fetchMovies]);

  const updateMovie = useCallback(async (id: string, movieData: Partial<Movie>) => {
    try {
      const response = await api.put(`/movies/${id}`, movieData);
      if (response.data.success) {
        toast.success("Movie updated!");
        fetchMovies();
        return true;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update movie");
    }
    return false;
  }, [fetchMovies]);

  const deleteMovie = useCallback(async (id: string) => {
    try {
      const response = await api.delete(`/movies/${id}`);
      if (response.data.success) {
        toast.success("Movie deleted!");
        fetchMovies();
        return true;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete movie");
    }
    return false;
  }, [fetchMovies]);

  const getMovieById = useCallback(
    (id: string) => movies.find((movie) => movie.id === id),
    [movies]
  );

  return (
    <MovieContext.Provider
      value={{ movies, isLoading, addMovie, updateMovie, deleteMovie, getMovieById }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};
