import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Clapperboard, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Container, Box, Typography, TextField, Button, Paper, Alert, InputAdornment } from "@mui/material";

const LoginPage = () => {
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate("/admin");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: 'calc(100vh - 4rem)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ w: '100%', py: 8 }}>
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'inline-flex', p: 2, borderRadius: 4, bgcolor: 'primary.main', color: 'background.default', mb: 3 }}>
            <Clapperboard size={40} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Admin Login
          </Typography>
          <Typography color="text.secondary">
            Sign in to manage movies
          </Typography>
        </Box>

        {/* Login Form */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {error && (
                <Alert severity="error" icon={<AlertCircle size={20} />} sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                label="Email"
                type="email"
                fullWidth
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} className="text-muted-foreground" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} className="text-muted-foreground" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Box>
          </form>

          {/* Demo credentials hint */}
          <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Demo credentials: <Box component="span" sx={{ px: 1, py: 0.5, borderRadius: 1, bgcolor: 'action.hover', color: 'text.primary', fontWeight: 600 }}>admin@gmail.com</Box> / <Box component="span" sx={{ px: 1, py: 0.5, borderRadius: 1, bgcolor: 'action.hover', color: 'text.primary', fontWeight: 600 }}>adminpassword</Box>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
