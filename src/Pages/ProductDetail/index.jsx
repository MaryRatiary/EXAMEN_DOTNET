import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  Rating, 
  Tabs, 
  Tab, 
  TextField,
  ImageList,
  ImageListItem
} from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Ces données devraient venir de votre backend
  const product = {
    id: 1,
    name: "Pierre Saphir de Madagascar",
    price: 299.99,
    description: "Magnifique saphir bleu authentique de Madagascar",
    rating: 4.5,
    reviews: 12,
    stock: 5,
    images: [
      "/public/logooo.jpeg",
      "/public/logooo.jpeg",
      "/public/logooo.jpeg"
    ],
    details: {
      origin: "Madagascar",
      poids: "2.5 carats",
      couleur: "Bleu profond",
      certificat: "Certification internationale"
    }
  };

  const handleAddToCart = () => {
    // Implémenter la logique d'ajout au panier
    console.log('Ajouter au panier:', { productId: id, quantity });
  };

  return (
    <Container maxWidth="xl" className="py-8">
      <Grid container spacing={4}>
        {/* Images du produit */}
        <Grid item xs={12} md={6}>
          <Box className="sticky top-24">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full rounded-lg shadow-lg mb-4"
            />
            <ImageList cols={3} gap={8}>
              {product.images.map((img, index) => (
                <ImageListItem key={index}>
                  <img
                    src={img}
                    alt={`${product.name} vue ${index + 1}`}
                    className="rounded-lg cursor-pointer hover:opacity-80"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Grid>

        {/* Informations produit */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" className="mb-4">
            {product.name}
          </Typography>
          
          <Box className="flex items-center mb-4">
            <Rating value={product.rating} readOnly precision={0.5} />
            <Typography variant="body2" className="ml-2">
              ({product.reviews} avis)
            </Typography>
          </Box>

          <Typography variant="h4" color="primary" className="mb-4">
            {product.price.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            })}
          </Typography>

          <Typography variant="body1" className="mb-6">
            {product.description}
          </Typography>

          <Box className="flex items-center gap-4 mb-6">
            <TextField
              type="number"
              label="Quantité"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              InputProps={{ inputProps: { min: 1, max: product.stock } }}
              className="w-24"
            />
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Ajouter au panier
            </Button>
          </Box>

          {product.stock <= 5 && (
            <Typography color="error" className="mb-4">
              Plus que {product.stock} en stock !
            </Typography>
          )}

          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} className="mb-4">
            <Tab label="Détails" />
            <Tab label="Livraison" />
            <Tab label="Avis" />
          </Tabs>

          {selectedTab === 0 && (
            <Box>
              {Object.entries(product.details).map(([key, value]) => (
                <Box key={key} className="flex py-2 border-b">
                  <Typography variant="subtitle1" className="w-1/3 font-bold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Typography>
                  <Typography variant="body1">
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {selectedTab === 1 && (
            <Box>
              <Typography variant="body1">
                Livraison internationale disponible
                <br />
                Délai de livraison estimé : 5-7 jours ouvrés
                <br />
                Livraison gratuite à partir de 500€
              </Typography>
            </Box>
          )}

          {selectedTab === 2 && (
            <Box>
              <Typography variant="body1">
                Les avis clients seront affichés ici
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;