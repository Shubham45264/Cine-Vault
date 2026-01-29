import { Toaster as HotToaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "@/context/MovieContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "@/pages/HomePage";
import MovieDetailPage from "@/pages/MovieDetailPage";
import LoginPage from "@/pages/LoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import MovieFormPage from "@/pages/MovieFormPage";
import SearchPage from "@/pages/SearchPage";
import NotFound from "@/pages/NotFound";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f59e0b',
    },
    background: {
      default: '#0a0c10',
      paper: '#111827',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MovieProvider>
          <HotToaster position="top-right" toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }} />
          <BrowserRouter>
            <Box sx={{ minHeight: '100vh' }}>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add"
                  element={
                    <ProtectedRoute>
                      <MovieFormPage mode="add" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/edit/:id"
                  element={
                    <ProtectedRoute>
                      <MovieFormPage mode="edit" />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </MovieProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
