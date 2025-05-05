import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Alert,
} from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous implémenterez l'envoi du formulaire vers votre backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" className="mb-8 text-center">
        Contactez-nous
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="mb-4">
            Envoyez-nous un message
          </Typography>
          
          {submitted && (
            <Alert severity="success" className="mb-4">
              Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  name="email"
                  label="Votre email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="subject"
                  label="Sujet"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="message"
                  label="Votre message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Envoyer le message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="mb-4">
            Nos Informations
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" className="mb-2">
                    Adresse
                  </Typography>
                  <Typography variant="body1" className="mb-4">
                    123 Rue des Pierres Précieuses<br />
                    Antananarivo, Madagascar
                  </Typography>

                  <Typography variant="h6" className="mb-2">
                    Contact
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    Email: contact@pierres-madagascar.com
                  </Typography>
                  <Typography variant="body1" className="mb-4">
                    Téléphone: +261 34 00 000 00
                  </Typography>

                  <Typography variant="h6" className="mb-2">
                    Horaires d'ouverture
                  </Typography>
                  <Typography variant="body1">
                    Lundi - Vendredi: 9h00 - 18h00<br />
                    Samedi: 9h00 - 13h00<br />
                    Dimanche: Fermé
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" className="mb-2">
                    Service Client
                  </Typography>
                  <Typography variant="body1" className="mb-4">
                    Notre équipe est disponible pour répondre à toutes vos questions
                    concernant nos produits, les commandes et les expéditions.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    FAQ
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;