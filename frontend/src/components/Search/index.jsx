import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Popper,
  ClickAwayListener,
} from '@mui/material';

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Exemple de données de suggestion (à remplacer par une vraie API)
  const mockProducts = [
    {
      id: 1,
      name: 'Saphir Bleu Royal',
      image: '/public/logooo.jpeg',
      price: 299.99,
      category: 'Pierres Précieuses'
    },
    {
      id: 2,
      name: 'Rubis Rouge Intense',
      image: '/public/logooo.jpeg',
      price: 399.99,
      category: 'Pierres Précieuses'
    },
    {
      id: 3,
      name: 'Émeraude Verte',
      image: '/public/logooo.jpeg',
      price: 499.99,
      category: 'Pierres Précieuses'
    }
  ];

  useEffect(() => {
    if (searchTerm.length >= 2) {
      setLoading(true);
      // Simuler un appel API
      const timer = setTimeout(() => {
        const filtered = mockProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered);
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setAnchorEl(event.currentTarget);
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchTerm('');
    setSuggestions([]);
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setSuggestions([]);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && suggestions.length > 0;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="relative w-full max-w-md">
        <TextField
          fullWidth
          placeholder="Rechercher des pierres précieuses..."
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          className="bg-white rounded-lg"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  🔍
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          className="z-50 w-full max-w-md"
        >
          <Paper className="mt-1 shadow-lg">
            <List>
              {loading ? (
                <ListItem>
                  <ListItemText primary="Recherche en cours..." />
                </ListItem>
              ) : suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <ListItem
                    key={product.id}
                    button
                    onClick={() => handleSuggestionClick(product.id)}
                    className="hover:bg-gray-100"
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={product.image}
                        alt={product.name}
                        variant="rounded"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {product.price.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                          })}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))
              ) : searchTerm.length >= 2 ? (
                <ListItem>
                  <ListItemText primary="Aucun résultat trouvé" />
                </ListItem>
              ) : null}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default Search;
