import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { Clapperboard, LogIn, LogOut, LayoutDashboard, Plus, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{
      background: 'rgba(10, 12, 16, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 8, lg: 12 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              '&:hover .logo-icon': { bgcolor: 'primary.main', color: 'background.default' }
            }}
          >
            <Box
              className="logo-icon"
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'background.default',
                display: 'flex',
                transition: 'all 0.3s'
              }}
            >
              <Clapperboard size={20} />
            </Box>
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                letterSpacing: '-0.5px'
              }}
            >
              CineVault
            </Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              to="/search"
              color={isActive("/search") ? "primary" : "inherit"}
              startIcon={<Search size={18} />}
            >
              Search
            </Button>
            {isAuthenticated && user?.role === "admin" && (
              <>
                <Button
                  component={Link}
                  to="/admin"
                  color={isActive("/admin") ? "primary" : "inherit"}
                  startIcon={<LayoutDashboard size={18} />}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  Dashboard
                </Button>
                <Button
                  component={Link}
                  to="/admin/add"
                  color={isActive("/admin/add") ? "primary" : "inherit"}
                  startIcon={<Plus size={18} />}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  Add Movie
                </Button>
              </>
            )}

            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                color="inherit"
                startIcon={<LogOut size={18} />}
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                startIcon={<LogIn size={18} />}
                sx={{ fontWeight: 600 }}
              >
                Admin Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
