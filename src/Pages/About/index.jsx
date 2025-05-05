import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
} from '@mui/material';

const About = () => {
  const values = [
    {
      title: 'Authenticité',
      description: 'Chaque pierre est authentifiée et certifiée, garantissant son origine et sa qualité.',
      icon: '💎'
    },
    {
      title: 'Éthique',
      description: 'Nous travaillons en étroite collaboration avec les communautés locales pour un commerce équitable.',
      icon: '🤝'
    },
    {
      title: 'Excellence',
      description: 'Notre expertise et notre savoir-faire garantissent des produits d exception.',
      icon: '⭐'
    },
    {
      title: 'Durabilité',
      description: 'Nous nous engageons pour une exploitation responsable et durable des ressources.',
      icon: '🌱'
    }
  ];

  const team = [
    {
      name: 'Jean Rakoto',
      role: 'Fondateur & CEO',
      image: '/public/logooo.jpeg',
      description: '20 ans d\'expertise dans le commerce de pierres précieuses'
    },
    {
      name: 'Marie Ratsara',
      role: 'Experte en Gemmologie',
      image: '/public/logooo.jpeg',
      description: 'Certification internationale en gemmologie'
    },
    {
      name: 'Paul Randria',
      role: 'Responsable Qualité',
      image: '/public/logooo.jpeg',
      description: 'Garantit l\'authenticité de chaque pierre'
    }
  ];

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Section Histoire */}
      <Box className="text-center mb-16">
        <Typography variant="h3" className="mb-6">
          Notre Histoire
        </Typography>
        <Typography variant="subtitle1" className="mb-8 max-w-3xl mx-auto">
          Depuis plus de 10 ans, nous mettons en valeur les trésors naturels de Madagascar
          en proposant des pierres précieuses authentiques et des créations artisanales uniques.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <img
              src="/public/logooo.jpeg"
              alt="Notre histoire"
              className="w-full rounded-lg shadow-lg"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Section Valeurs */}
      <Box className="mb-16">
        <Typography variant="h3" className="mb-8 text-center">
          Nos Valeurs
        </Typography>
        <Grid container spacing={4}>
          {values.map((value) => (
            <Grid item xs={12} sm={6} md={3} key={value.title}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardContent>
                  <Typography variant="h2" className="mb-4">
                    {value.icon}
                  </Typography>
                  <Typography variant="h6" className="mb-2">
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Section Expertise */}
      <Box className="mb-16 bg-gray-50 py-12 px-4 rounded-lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" className="mb-4">
              Notre Expertise
            </Typography>
            <Typography variant="body1" className="mb-4">
              Forte d'une expérience de plus d'une décennie, notre équipe d'experts
              sélectionne avec soin chaque pierre précieuse. Notre connaissance approfondie
              du marché et nos relations privilégiées avec les artisans locaux nous
              permettent de vous offrir des pièces exceptionnelles.
            </Typography>
            <Typography variant="body1">
              Chaque pierre est minutieusement expertisée et certifiée, garantissant
              son authenticité et sa qualité. Nous sommes fiers de contribuer au
              développement durable de Madagascar tout en partageant ses trésors
              avec le monde entier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="/public/logooo.jpeg"
              alt="Notre expertise"
              className="w-full rounded-lg shadow-lg"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Section Équipe */}
      <Box>
        <Typography variant="h3" className="mb-8 text-center">
          Notre Équipe
        </Typography>
        <Grid container spacing={4}>
          {team.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardMedia
                  component="img"
                  height="300"
                  image={member.image}
                  alt={member.name}
                  className="h-64 object-cover"
                />
                <CardContent>
                  <Typography variant="h6" className="mb-1">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" className="mb-2">
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Section Engagement */}
      <Box className="mt-16 text-center">
        <Divider className="mb-8" />
        <Typography variant="h5" className="mb-4">
          Notre Engagement
        </Typography>
        <Typography variant="body1" className="max-w-3xl mx-auto">
          Nous nous engageons à promouvoir le commerce équitable et à soutenir
          les communautés locales de Madagascar. Chaque achat contribue au
          développement durable de l'industrie des pierres précieuses dans le pays.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;