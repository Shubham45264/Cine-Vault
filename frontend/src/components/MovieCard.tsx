import { Card, CardMedia, CardContent, Typography, Box, Chip, Rating } from "@mui/material";
import { Star, Clock } from "lucide-react";
import { Movie } from "@/types/movie";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <Card
      component={Link}
      to={`/movie/${movie.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: 3,
        textDecoration: 'none',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
          '& .movie-title': { color: 'primary.main' }
        }
      }}
    >
      <Box sx={{ position: 'relative', pt: '150%' }}>
        <CardMedia
          component="img"
          image={movie.posterUrl}
          alt={movie.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=500';
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            borderRadius: '20px',
            px: 1,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'primary.main',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}
        >
          <Star size={14} fill="currentColor" />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {movie.rating.toFixed(1)}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2, '&:last-child': { pb: 2 } }}>
        <Typography
          className="movie-title"
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            transition: 'color 0.2s',
            height: '3rem',
            lineHeight: 1.2
          }}
        >
          {movie.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, opacity: 0.7 }}>
          <Typography variant="body2">{getYear(movie.releaseDate)}</Typography>
          <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'currentColor' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Clock size={14} />
            <Typography variant="body2">{formatDuration(movie.duration)}</Typography>
          </Box>
        </Box>

        {movie.genre && movie.genre.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {movie.genre.slice(0, 2).map((g) => (
              <Chip
                key={g}
                label={g}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.7rem',
                  height: 20,
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'text.secondary'
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
