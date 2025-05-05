import React from 'react';
import { Container, Grid, Typography, Link, Box, IconButton } from '@mui/material';

const Footer = () => {
  const sections = {
    'À Propos': ['Notre Histoire', 'Nos Valeurs', 'Notre Équipe', 'Certificats'],
    'Service Client': ['FAQ', 'Livraison', 'Retours', 'Contact'],
    'Informations Légales': ['CGV', 'Mentions Légales', 'Politique de Confidentialité', 'Cookies'],
    'Nos Garanties': ['Authenticité', 'Satisfaction Client', 'Paiement Sécurisé', 'Traçabilité']
  };

  const socialLinks = [
    { name: 'Facebook', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'LinkedIn', url: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {Object.entries(sections).map(([title, items]) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Typography variant="h6" className="mb-4 font-bold">
                {title}
              </Typography>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" color="inherit" className="hover:text-gray-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>

        <Box className="mt-8 pt-8 border-t border-gray-800">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="text-center md:text-left">
                Pierres Précieuses de Madagascar
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} className="text-center">
              <div className="space-x-4">
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.name}
                    href={social.url}
                    color="inherit"
                    className="hover:text-gray-300"
                  >
                    {social.name}
                  </IconButton>
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" className="text-center md:text-right">
                © {new Date().getFullYear()} Tous droits réservés
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box className="mt-8 text-center text-sm text-gray-400">
          <Typography variant="body2">
            Paiement sécurisé | Livraison internationale | Service client 24/7
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;