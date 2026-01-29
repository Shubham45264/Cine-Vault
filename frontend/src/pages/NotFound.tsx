import { Link } from "react-router-dom";
import { Home, Film } from "lucide-react";
import { Container, Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ minHeight: 'calc(100vh - 4rem)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', bgcolor: 'background.paper', mb: 4 }}>
          <Film size={64} className="text-muted-foreground" />
        </Box>
        <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 800, mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
          This scene doesn't exist in our collection
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<Home size={20} />}
          sx={{ fontWeight: 600, px: 4, py: 1.5, borderRadius: 3 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
