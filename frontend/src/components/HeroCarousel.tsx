import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Clock, Play } from "lucide-react";
import { Movie } from "@/types/movie";
import { Container, Box, Typography, Button, IconButton, Stack } from "@mui/material";

interface HeroCarouselProps {
  movies: Movie[];
}

const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = movies.slice(0, 5);

  useEffect(() => {
    if (featuredMovies.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  if (featuredMovies.length === 0) return null;

  const currentMovie = featuredMovies[currentIndex];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', height: 'calc(100vh - 4rem)', overflow: 'hidden' }}>
      {/* Background Images */}
      {featuredMovies.map((movie, index) => (
        <Box
          key={movie.id}
          sx={{
            position: 'absolute',
            inset: 0,
            transition: 'opacity 1s ease-in-out',
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0
          }}
        >
          <Box
            component="img"
            src={movie.posterUrl}
            alt={movie.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.6)',
              animation: index === currentIndex ? 'slowScale 20s linear infinite' : 'none'
            }}
            onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1280'; }}
          />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a0c10 0%, rgba(10, 12, 16, 0.6) 40%, transparent 100%)' }} />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0c10 0%, transparent 50%)' }} />
        </Box>
      ))}

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ maxWidth: 700, p: { xs: 4, md: 0 } }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Box sx={{ bgcolor: 'rgba(245, 158, 11, 0.2)', color: 'primary.main', px: 2, py: 0.5, borderRadius: 2, fontSize: '0.875rem', fontWeight: 600 }}>Featured</Box>
            <Typography variant="body2" color="text.secondary">{new Date(currentMovie.releaseDate).getFullYear()}</Typography>
          </Stack>

          <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '3rem', md: '4rem', lg: '5rem' }, letterSpacing: '-2px', lineHeight: 1.1 }}>
            {currentMovie.title}
          </Typography>

          <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', fontWeight: 700 }}>
              <Star size={18} fill="currentColor" />
              <Typography variant="h6">{currentMovie.rating.toFixed(1)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <Clock size={18} />
              <Typography>{formatDuration(currentMovie.duration)}</Typography>
            </Box>
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: '1.125rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {currentMovie.description}
          </Typography>

          <Button
            component={Link}
            to={`/movie/${currentMovie.id}`}
            variant="contained"
            size="large"
            startIcon={<Play size={20} fill="currentColor" />}
            sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 700, fontSize: '1rem' }}
          >
            View Details
          </Button>
        </Box>
      </Container>

      {/* Navigation Arrows */}
      <IconButton
        onClick={goToPrevious}
        sx={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 20, bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }, display: { xs: 'none', md: 'flex' } }}
      >
        <ChevronLeft size={32} />
      </IconButton>
      <IconButton
        onClick={goToNext}
        sx={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 20, bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }, display: { xs: 'none', md: 'flex' } }}
      >
        <ChevronRight size={32} />
      </IconButton>

      {/* Dots Indicator */}
      <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        {featuredMovies.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: index === currentIndex ? 32 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: index === currentIndex ? 'primary.main' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Stack>

      <style>{`
        @keyframes slowScale {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </Box>
  );
};

export default HeroCarousel;
