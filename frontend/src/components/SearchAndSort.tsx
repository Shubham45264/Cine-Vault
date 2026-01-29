import { TextField, Select, MenuItem, FormControl, Box, Stack, InputAdornment } from "@mui/material";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export type SortOption = "title" | "rating" | "releaseDate" | "duration";
export type SortOrder = "asc" | "desc";

interface SearchAndSortProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
}

const SearchAndSort = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
}: SearchAndSortProps) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={3}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      sx={{ mb: 6 }}
    >
      {/* Search Input */}
      <TextField
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
        sx={{ maxWidth: { sm: 400 } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} style={{ color: 'var(--mui-palette-text-secondary)' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Sort Controls */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', whiteSpace: 'nowrap' }}>
          <SlidersHorizontal size={16} />
          <Box component="span" sx={{ fontSize: '0.875rem' }}>Sort by:</Box>
        </Box>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            sx={{ bgcolor: 'background.paper' }}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="releaseDate">Release Date</MenuItem>
            <MenuItem value="duration">Duration</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
            sx={{ bgcolor: 'background.paper' }}
          >
            <MenuItem value="desc">High → Low</MenuItem>
            <MenuItem value="asc">Low → High</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default SearchAndSort;
