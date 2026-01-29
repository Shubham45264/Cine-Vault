import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, Calendar, Edit, Trash2 } from "lucide-react";
import { useMovies } from "@/context/MovieContext";
import { useAuth } from "@/context/AuthContext";
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper
} from "@mui/material";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovieById, deleteMovie } = useMovies();
  const { isAuthenticated, user } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const movie = getMovieById(id || "");

  if (!movie) {
    return (
      <Container sx={{ py: 20, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Movie not found</Typography>
        <Button component={Link} to="/" variant="outlined">Back to Home</Button>
      </Container>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  const handleDelete = () => {
    deleteMovie(movie.id);
    navigate("/");
  };

  const isAdmin = isAuthenticated && user?.role === "admin";

  return (
    <Box sx={{ minHeight: 'calc(100vh - 4rem)' }}>
      {/* Hero with poster background */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <Box
            component="img"
            src={movie.posterUrl}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(30px) opacity(0.3)', transform: 'scale(1.1)' }}
            onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1280'; }}
          />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(10, 12, 16, 0.9), #0a0c10)' }} />
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
          <Button
            startIcon={<ArrowLeft size={18} />}
            onClick={() => navigate(-1)}
            sx={{ mb: 6, color: 'text.secondary' }}
          >
            Back
          </Button>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 6, md: 8 }} alignItems={{ xs: 'center', md: 'flex-start' }}>
            {/* Poster */}
            <Box sx={{ flexShrink: 0 }}>
              <Paper elevation={24} sx={{ width: { xs: 240, sm: 320 }, aspectRatio: '2/3', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Box
                  component="img"
                  src={movie.posterUrl}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=500'; }}
                />
              </Paper>
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, letterSpacing: '-1px', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                {movie.title}
              </Typography>

              <Stack direction="row" spacing={3} justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', fontWeight: 700, bgcolor: 'rgba(245, 158, 11, 0.1)', px: 2, py: 0.5, borderRadius: 2 }}>
                  <Star size={18} fill="currentColor" />
                  <Typography variant="h6">{movie.rating.toFixed(1)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                  <Calendar size={18} />
                  <Typography>{formatDate(movie.releaseDate)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                  <Clock size={18} />
                  <Typography>{formatDuration(movie.duration)}</Typography>
                </Box>
              </Stack>

              {movie.genre && movie.genre.length > 0 && (
                <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mb: 6, flexWrap: 'wrap', gap: 1 }}>
                  {movie.genre.map((g) => (
                    <Chip key={g} label={g} variant="outlined" sx={{ borderRadius: 2, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }} />
                  ))}
                </Stack>
              )}

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Overview</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 8, lineHeight: 1.8, maxWidth: '800px' }}>
                {movie.description}
              </Typography>

              {isAdmin && (
                <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Button
                    component={Link}
                    to={`/admin/edit/${movie.id}`}
                    variant="outlined"
                    startIcon={<Edit size={18} />}
                    sx={{ borderRadius: 2, px: 3 }}
                  >
                    Edit Movie
                  </Button>
                  <Button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    variant="contained"
                    color="error"
                    startIcon={<Trash2 size={18} />}
                    sx={{ borderRadius: 2, px: 3 }}
                  >
                    Delete Movie
                  </Button>
                </Stack>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete "{movie.title}"?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete the movie from the CineVault database.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MovieDetailPage;
