import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Rating, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        className="h-48 object-cover"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2" className="font-bold">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          {product.description}
        </Typography>
        <Box className="flex items-center mb-2">
          <Rating value={product.rating} readOnly precision={0.5} />
          <Typography variant="body2" className="ml-2">
            ({product.reviews} avis)
          </Typography>
        </Box>
        <Box className="flex justify-between items-center">
          <Typography variant="h6" color="primary" className="font-bold">
            {product.price.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            })}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            Voir détails
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={handleAddToCart}
          >
            Ajouter au panier
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;