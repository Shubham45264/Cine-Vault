import { Box, Typography, Skeleton } from "@mui/material";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
}

const MovieGrid = ({ movies, isLoading }: MovieGridProps) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 4 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <Box key={i}>
            <Skeleton variant="rectangular" sx={{ aspectRatio: '2/3', borderRadius: 4, mb: 2 }} />
            <Skeleton variant="text" sx={{ width: '80%', height: 24, mb: 1 }} />
            <Skeleton variant="text" sx={{ width: '40%', height: 16 }} />
          </Box>
        ))}
      </Box>
    );
  }

  if (movies.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 12, textAlign: 'center', opacity: 0.5 }}>
        <Box sx={{ fontSize: '4rem', mb: 2 }}>🎬</Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>No movies found</Typography>
        <Typography color="text.secondary">Try adjusting your search or filters</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }, gap: 5 }}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
};

export default MovieGrid;
