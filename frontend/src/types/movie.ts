export interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
  releaseDate: string;
  duration: number; // in minutes
  posterUrl: string;
  genre?: string[];
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
