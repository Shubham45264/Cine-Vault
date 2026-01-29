import { useState, useMemo } from "react";
import { useMovies } from "@/context/MovieContext";
import MovieGrid from "@/components/MovieGrid";
import HeroCarousel from "@/components/HeroCarousel";
import SearchAndSort, { SortOption, SortOrder } from "@/components/SearchAndSort";
import { Pagination, PaginationItem, Box, Container, Typography, CircularProgress } from "@mui/material";

const HomePage = () => {
  const { movies, isLoading } = useMovies();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Get latest movies (sorted by release date)
  const latestMovies = useMemo(() => {
    return [...movies].sort(
      (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  }, [movies]);

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) ||
          movie.description.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "rating":
          comparison = a.rating - b.rating;
          break;
        case "releaseDate":
          comparison = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
          break;
        case "duration":
          comparison = a.duration - b.duration;
          break;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    return result;
  }, [movies, searchQuery, sortBy, sortOrder]);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ pb: 10 }}>
      {/* Hero Carousel - Latest Movies */}
      <HeroCarousel movies={latestMovies} />

      <Container maxWidth={false} sx={{ px: { xs: 2, md: 8, lg: 12 }, mt: 8 }}>
        {/* Section Title */}
        <Box component="section" sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-1px' }}>
            Browse <Box component="span" className="text-gradient">All Movies</Box>
          </Typography>
          <Typography color="text.secondary">
            Explore the greatest films of all time
          </Typography>
        </Box>

        {/* Search & Sort */}
        <Box component="section" sx={{ mb: 4 }}>
          <SearchAndSort
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
        </Box>

        {/* Results count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Showing {filteredAndSortedMovies.length} of {movies.length} movies
        </Typography>

        {/* Movie Grid */}
        <MovieGrid movies={filteredAndSortedMovies} />

        {/* Pagination (MUI) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, mb: 4 }}>
          <Pagination
            count={Math.ceil(filteredAndSortedMovies.length / 10) || 1}
            color="primary"
            size="large"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  color: 'text.secondary',
                  '&.Mui-selected': { bgcolor: 'primary.main', color: 'background.default' }
                }}
              />
            )}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
