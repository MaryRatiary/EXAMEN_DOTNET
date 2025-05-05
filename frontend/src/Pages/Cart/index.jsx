import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardContent, IconButton, Button, Box } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Box className="text-center">
          <Typography variant="h5" className="mb-4">
            Votre panier est vide
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
          >
            Continuer vos achats
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-6">
        Votre Panier
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <img
                      src={item.imageUrl || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-full rounded-lg"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.price.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className="flex items-center gap-2">
                      <IconButton 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={2} className="text-right">
                    <IconButton 
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="sticky top-24">
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Résumé de la commande
              </Typography>
              
              <Box className="space-y-2 mb-4">
                <Box className="flex justify-between">
                  <Typography>Sous-total</Typography>
                  <Typography>
                    {total.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography>Livraison</Typography>
                  <Typography>Gratuite</Typography>
                </Box>
                <Box className="flex justify-between font-bold pt-2 border-t">
                  <Typography>Total</Typography>
                  <Typography>
                    {total.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </Typography>
                </Box>
              </Box>

              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={() => navigate('/checkout')}
              >
                Procéder au paiement
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;