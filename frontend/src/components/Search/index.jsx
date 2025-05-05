import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  IconButton,
  InputAdornment,
  Autocomplete,
  Paper
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { productsAPI } from '../../services/api';
import './style.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await productsAPI.getAll();
      const products = response.data;
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} className="search-container">
      <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => 
          typeof option === 'string' ? option : option.name
        }
        filterOptions={(x) => x}
        onInputChange={(event, value) => {
          setQuery(value);
          handleSearch(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Rechercher un produit..."
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <div className="flex items-center p-2">
              {option.imageUrl && (
                <img
                  src={option.imageUrl}
                  alt={option.name}
                  className="w-12 h-12 object-cover rounded mr-4"
                />
              )}
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-gray-600">
                  {option.price?.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </div>
              </div>
            </div>
          </li>
        )}
      />
    </Paper>
  );
};

export default Search;
