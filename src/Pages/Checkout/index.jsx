import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Divider
} from '@mui/material';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const steps = ['Livraison', 'Paiement', 'Confirmation'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Prénom"
            value={shippingInfo.firstName}
            onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Nom"
            value={shippingInfo.lastName}
            onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="email"
            label="Email"
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Téléphone"
            value={shippingInfo.phone}
            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Adresse"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Ville"
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Code Postal"
            value={shippingInfo.postalCode}
            onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Pays"
            value={shippingInfo.country}
            onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Continuer vers le paiement
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const renderPaymentForm = () => (
    <div>
      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <Card className="mb-3">
          <CardContent>
            <FormControlLabel
              value="card"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1">Carte bancaire</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Visa, Mastercard, American Express
                  </Typography>
                </Box>
              }
            />
          </CardContent>
        </Card>

        <Card className="mb-3">
          <CardContent>
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1">PayPal</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Paiement rapide et sécurisé
                  </Typography>
                </Box>
              }
            />
          </CardContent>
        </Card>
      </RadioGroup>

      {paymentMethod === 'card' && (
        <Card className="mt-4">
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Numéro de carte"
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Date d'expiration"
                  placeholder="MM/AA"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="CVC"
                  placeholder="123"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      <Box className="mt-4">
        <Button
          onClick={handleBack}
          className="mr-2"
        >
          Retour
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          Confirmer la commande
        </Button>
      </Box>
    </div>
  );

  const renderConfirmation = () => (
    <Box className="text-center">
      <Typography variant="h5" className="mb-4">
        Commande confirmée !
      </Typography>
      <Typography variant="body1" className="mb-4">
        Merci pour votre commande. Vous recevrez bientôt un email de confirmation.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Numéro de commande: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-6">
        Finaliser la commande
      </Typography>

      <Stepper activeStep={activeStep} className="mb-8">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {activeStep === 0 && renderShippingForm()}
          {activeStep === 1 && renderPaymentForm()}
          {activeStep === 2 && renderConfirmation()}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="sticky top-24">
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Résumé de la commande
              </Typography>
              
              <Box className="space-y-2">
                <Box className="flex justify-between">
                  <Typography>Sous-total</Typography>
                  <Typography>699.98 €</Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography>Livraison</Typography>
                  <Typography>Gratuite</Typography>
                </Box>
                <Divider className="my-2" />
                <Box className="flex justify-between">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    699.98 €
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;