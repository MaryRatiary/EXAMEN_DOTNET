import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  // Exemple de données du panier (à remplacer par votre état réel)
  const cartItems = [
    {
      id: 1,
      name: "Saphir Bleu",
      price: 299.99,
      quantity: 1,
      image: "/public/logooo.jpeg"
    },
    {
      id: 2,
      name: "Rubis Rouge",
      price: 399.99,
      quantity: 2,
      image: "/public/logooo.jpeg"
    }
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    // Implémenter la mise à jour de la quantité
    console.log('Mise à jour quantité:', { itemId, newQuantity });
  };

  const handleRemoveItem = (itemId) => {
    // Implémenter la suppression d'un article
    console.log('Supprimer article:', itemId);
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-6">
        Votre Panier
      </Typography>

      {cartItems.length === 0 ? (
        <Box className="text-center py-8">
          <Typography variant="h6" className="mb-4">
            Votre panier est vide
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Continuer vos achats
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full rounded-lg"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Box className="flex justify-between items-start">
                        <div>
                          <Typography variant="h6" className="mb-2">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Prix unitaire: {item.price.toLocaleString('fr-FR', {
                              style: 'currency',
                              currency: 'EUR'
                            })}
                          </Typography>
                        </div>
                        <IconButton
                          onClick={() => handleRemoveItem(item.id)}
                          color="error"
                        >
                          ×
                        </IconButton>
                      </Box>
                      <Box className="flex items-center mt-4">
                        <Button
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <Typography className="mx-4">
                          {item.quantity}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Typography className="ml-auto" variant="h6">
                          {(item.price * item.quantity).toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                          })}
                        </Typography>
                      </Box>
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
                <Box className="flex justify-between mb-2">
                  <Typography>Sous-total</Typography>
                  <Typography>
                    {calculateTotal().toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </Typography>
                </Box>
                <Box className="flex justify-between mb-2">
                  <Typography>Livraison</Typography>
                  <Typography>Gratuite</Typography>
                </Box>
                <Divider className="my-4" />
                <Box className="flex justify-between mb-4">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    {calculateTotal().toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/checkout')}
                >
                  Procéder au paiement
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;