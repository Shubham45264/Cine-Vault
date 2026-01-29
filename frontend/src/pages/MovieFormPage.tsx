import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { useMovies } from "@/context/MovieContext";
import { Container, Box, Typography, TextField, Button, Paper } from "@mui/material";

interface MovieFormData {
  title: string;
  description: string;
  rating: string;
  releaseDate: string;
  duration: string;
  posterUrl: string;
  genre: string;
}

const initialFormData: MovieFormData = {
  title: "",
  description: "",
  rating: "",
  releaseDate: "",
  duration: "",
  posterUrl: "",
  genre: "",
};

interface MovieFormPageProps {
  mode: "add" | "edit";
}

const MovieFormPage = ({ mode }: MovieFormPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addMovie, updateMovie, getMovieById } = useMovies();

  const [formData, setFormData] = useState<MovieFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<MovieFormData>>({});

  useEffect(() => {
    if (mode === "edit" && id) {
      const movie = getMovieById(id);
      if (movie) {
        setFormData({
          title: movie.title,
          description: movie.description,
          rating: movie.rating.toString(),
          releaseDate: movie.releaseDate.split("T")[0],
          duration: movie.duration.toString(),
          posterUrl: movie.posterUrl,
          genre: movie.genre?.join(", ") || "",
        });
      } else {
        navigate("/admin");
      }
    }
  }, [mode, id, getMovieById, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Partial<MovieFormData> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.rating || isNaN(Number(formData.rating)) || Number(formData.rating) < 0 || Number(formData.rating) > 10) {
      newErrors.rating = "Rating must be between 0 and 10";
    }
    if (!formData.releaseDate) newErrors.releaseDate = "Release date is required";
    if (!formData.duration || isNaN(Number(formData.duration)) || Number(formData.duration) <= 0) {
      newErrors.duration = "Duration must be a positive number";
    }
    if (!formData.posterUrl.trim()) newErrors.posterUrl = "Poster URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const movieData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      rating: Number(formData.rating),
      releaseDate: formData.releaseDate,
      duration: Number(formData.duration),
      posterUrl: formData.posterUrl.trim(),
      genre: formData.genre.split(",").map((g) => g.trim()).filter(Boolean),
    };

    if (mode === "add") {
      addMovie(movieData).then((success) => {
        if (success) navigate("/admin");
      });
    } else if (id) {
      updateMovie(id, movieData).then((success) => {
        if (success) navigate("/admin");
      });
    }
  };

  const handleChange = (field: keyof MovieFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Button
        startIcon={<ArrowLeft size={18} />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4, color: 'text.secondary' }}
      >
        Back
      </Button>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          {mode === "add" ? "Add New Movie" : "Edit Movie"}
        </Typography>
        <Typography color="text.secondary">
          {mode === "add" ? "Fill in the details to add a new movie" : "Update the movie details below"}
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
            <Box sx={{ gridColumn: 'span 12' }}>
              <TextField
                label="Movie Title *"
                fullWidth
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 12' }}>
              <TextField
                label="Description *"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 6' }}>
              <TextField
                label="Rating (0-10) *"
                fullWidth
                type="number"
                value={formData.rating}
                onChange={(e) => handleChange("rating", e.target.value)}
                error={!!errors.rating}
                helperText={errors.rating}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 6' }}>
              <TextField
                label="Duration (mins) *"
                fullWidth
                type="number"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                error={!!errors.duration}
                helperText={errors.duration}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 12' }}>
              <TextField
                label="Release Date *"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.releaseDate}
                onChange={(e) => handleChange("releaseDate", e.target.value)}
                error={!!errors.releaseDate}
                helperText={errors.releaseDate}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 12' }}>
              <TextField
                label="Poster URL *"
                fullWidth
                type="url"
                value={formData.posterUrl}
                onChange={(e) => handleChange("posterUrl", e.target.value)}
                error={!!errors.posterUrl}
                helperText={errors.posterUrl}
              />
            </Box>
            {formData.posterUrl && (
              <Box sx={{ gridColumn: 'span 12', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary', fontWeight: 600 }}>PREVIEW</Typography>
                <Box sx={{ width: 120, height: 180, mx: 'auto', borderRadius: 2, overflow: 'hidden', border: '2px solid', borderColor: 'primary.main', opacity: 0.8 }}>
                  <Box
                    component="img"
                    src={formData.posterUrl}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=200'; }}
                  />
                </Box>
              </Box>
            )}
            <Box sx={{ gridColumn: 'span 12' }}>
              <TextField
                label="Genres (comma-separated)"
                fullWidth
                placeholder="Drama, Action, Thriller"
                value={formData.genre}
                onChange={(e) => handleChange("genre", e.target.value)}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 12', display: 'flex', gap: 2, mt: 2 }}>
              <Button fullWidth variant="outlined" sx={{ py: 1.5, borderRadius: 2 }} onClick={() => navigate(-1)}>Cancel</Button>
              <Button fullWidth variant="contained" type="submit" startIcon={<Save size={18} />} sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}>
                {mode === "add" ? "Add Movie" : "Save Changes"}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default MovieFormPage;
