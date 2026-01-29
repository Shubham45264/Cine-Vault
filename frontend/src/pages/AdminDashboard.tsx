import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Star, Clock, Film } from "lucide-react";
import { useMovies } from "@/context/MovieContext";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

const AdminDashboard = () => {
  const { movies, isLoading, deleteMovie } = useMovies();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteId(id);
    setDeleteTitle(title);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMovie(deleteId);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  if (isLoading) {
    return (
      <Container sx={{ py: 20, textAlign: 'center' }}>
        <Box sx={{ width: 40, height: 40, border: '4px solid', borderColor: 'primary.main', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', mx: 'auto', mb: 4 }} />
        <Typography color="text.secondary">Loading dashboard...</Typography>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Container>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 3, mb: 6 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Admin <span className="text-gradient">Dashboard</span>
          </Typography>
          <Typography color="text.secondary">Manage your movie collection</Typography>
        </Box>
        <Button
          component={Link}
          to="/admin/add"
          variant="contained"
          size="large"
          startIcon={<Plus size={20} />}
          sx={{ fontWeight: 600, borderRadius: 2 }}
        >
          Add Movie
        </Button>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 3, mb: 6 }}>
        <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'background.paper' }}>
          <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'primary.main', color: 'background.default' }}>
            <Film size={24} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{movies.length}</Typography>
            <Typography variant="body2" color="text.secondary">Total Movies</Typography>
          </Box>
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'background.paper' }}>
          <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'primary.main', color: 'background.default' }}>
            <Star size={24} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {movies.length > 0 ? (movies.reduce((sum, m) => sum + m.rating, 0) / movies.length).toFixed(1) : "0"}
            </Typography>
            <Typography variant="body2" color="text.secondary">Avg Rating</Typography>
          </Box>
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'background.paper' }}>
          <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'primary.main', color: 'background.default' }}>
            <Clock size={24} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {movies.length > 0 ? Math.round(movies.reduce((sum, m) => sum + m.duration, 0) / movies.length) : "0"}m
            </Typography>
            <Typography variant="body2" color="text.secondary">Avg Duration</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Movies Table */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Movie</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Rating</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Duration</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Year</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={movie.posterUrl}
                      alt={movie.title}
                      sx={{ width: 48, height: 72, borderRadius: 1, objectFit: 'cover' }}
                      onError={(e: any) => {
                        e.target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=100';
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="hover:text-primary transition-colors">
                          {movie.title}
                        </Link>
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {movie.description}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: 'primary.main', color: 'background.default', px: 1, py: 0.25, borderRadius: 1, fontWeight: 700, fontSize: '0.75rem' }}>
                    <Star size={12} fill="currentColor" />
                    {movie.rating.toFixed(1)}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ color: 'text.secondary' }}>{formatDuration(movie.duration)}</TableCell>
                <TableCell align="center" sx={{ color: 'text.secondary' }}>{new Date(movie.releaseDate).getFullYear()}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton component={Link} to={`/admin/edit/${movie.id}`} size="small">
                      <Edit size={18} />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(movie.id, movie.title)} size="small" color="error">
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {movies.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 12, opacity: 0.5 }}>
          <Film size={64} style={{ margin: '0 auto 16px' }} />
          <Typography>No movies yet. Add your first movie!</Typography>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={cancelDelete}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete "{deleteTitle}"?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All data related to this movie will be permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={cancelDelete} color="inherit">Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
