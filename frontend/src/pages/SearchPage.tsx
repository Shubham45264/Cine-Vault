import { useState, useMemo } from "react";
import { useMovies } from "@/context/MovieContext";
import MovieGrid from "@/components/MovieGrid";
import { Container, Typography, TextField, Box, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";

const SearchPage = () => {
  const { movies, isLoading } = useMovies();
  const [query, setQuery] = useState("");

  const filteredMovies = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return movies.filter(
      (m) => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
    );
  }, [movies, query]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          Search <span className="text-gradient">Movies</span>
        </Typography>
        <Typography color="text.secondary">
          Find your favorite movies by name or description
        </Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search className="text-muted-foreground" size={20} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 8,
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            borderRadius: 4,
            '& fieldset': { borderColor: 'divider' },
            '&:hover fieldset': { borderColor: 'primary.main' },
          }
        }}
      />

      {query.trim() && (
        <>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
            Results for "{query}"
          </Typography>
          <MovieGrid movies={filteredMovies} isLoading={isLoading} />
        </>
      )}

      {!query.trim() && (
        <Box sx={{ py: 10, textAlign: 'center', opacity: 0.5 }}>
          <Typography variant="h6">Start typing to search...</Typography>
        </Box>
      )}
    </Container>
  );
};

export default SearchPage;
