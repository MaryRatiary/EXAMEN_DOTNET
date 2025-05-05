import React from 'react';
import { Typography, Container, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-r from-blue-100 to-purple-100 py-16">
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" className="text-4xl font-bold mb-4">
                Découvrez les Trésors de Madagascar
              </Typography>
              <Typography variant="body1" className="text-lg mb-6">
                Des pierres précieuses et des bijoux artisanaux authentiques directement de Madagascar
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Découvrir nos Collections
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img 
                src="/public/logooo.jpeg" 
                alt="Collections de pierres précieuses"
                className="w-full rounded-lg shadow-xl"
              />
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Featured Categories */}
      <Container maxWidth="xl" className="py-16">
        <Typography variant="h3" className="text-3xl font-bold mb-8 text-center">
          Nos Catégories Phares
        </Typography>
        <Grid container spacing={4}>
          {['Pierres Précieuses', 'Bijoux Artisanaux', 'Collections Exclusives', 'Nouveautés'].map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardMedia
                  component="div"
                  className="h-48 bg-gray-200"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {category}
                  </Typography>
                  <Button color="primary">Explorer</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Special Offers */}
      <div className="bg-gray-50 py-16">
        <Container maxWidth="xl">
          <Typography variant="h3" className="text-3xl font-bold mb-8 text-center">
            Offres Spéciales
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card className="h-full">
                <CardContent className="text-center">
                  <Typography variant="h5" className="mb-4">
                    Livraison Gratuite
                  </Typography>
                  <Typography>
                    Sur toutes les commandes internationales
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="h-full bg-primary text-white">
                <CardContent className="text-center">
                  <Typography variant="h5" className="mb-4">
                    -20% sur les Bijoux Artisanaux
                  </Typography>
                  <Typography>
                    Offre limitée cette semaine
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Why Choose Us */}
      <Container maxWidth="xl" className="py-16">
        <Typography variant="h3" className="text-3xl font-bold mb-8 text-center">
          Pourquoi Nous Choisir
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Authenticité Garantie',
              description: 'Tous nos produits sont certifiés authentiques'
            },
            {
              title: 'Artisanat Local',
              description: 'Soutien direct aux artisans malgaches'
            },
            {
              title: 'Service Client Premium',
              description: 'Une équipe dédiée à votre satisfaction'
            },
            {
              title: 'Livraison Sécurisée',
              description: 'Suivi en temps réel de votre commande'
            }
          ].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Card className="h-full text-center">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-16">
        <Container maxWidth="sm" className="text-center">
          <Typography variant="h4" className="mb-4">
            Restez Informé
          </Typography>
          <Typography variant="body1" className="mb-6">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières offres et nouveautés
          </Typography>
          <Box className="flex gap-2 justify-center">
            <input
              type="email"
              placeholder="Votre email"
              className="px-4 py-2 border rounded-lg w-full max-w-xs"
            />
            <Button variant="contained" color="primary">
              S'inscrire
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Home;
