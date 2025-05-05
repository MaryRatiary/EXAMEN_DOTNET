import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Box,
  Divider
} from '@mui/material';
import { clearCart } from '../../store/slices/cartSlice';

const steps = ['Livraison', 'Paiement', 'Confirmation'];

const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setActiveStep(1);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Ici, vous intégreriez normalement un système de paiement réel
    setActiveStep(2);
  };

  const handleOrderComplete = () => {
    dispatch(clearCart());
    navigate('/');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleShippingSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Prénom"
                  value={shippingInfo.firstName}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  value={shippingInfo.lastName}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Adresse"
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, address: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Ville"
                  value={shippingInfo.city}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Code postal"
                  value={shippingInfo.postalCode}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Pays"
                  value={shippingInfo.country}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, country: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Téléphone"
                  value={shippingInfo.phone}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, phone: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Continuer vers le paiement
                </Button>
              </Grid>
            </Grid>
          </form>
        );

      case 1:
        return (
          <form onSubmit={handlePaymentSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Numéro de carte"
                  value={paymentInfo.cardNumber}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Nom sur la carte"
                  value={paymentInfo.cardName}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Date d'expiration (MM/YY)"
                  value={paymentInfo.expiryDate}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="CVV"
                  type="password"
                  value={paymentInfo.cvv}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Payer {total.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </Button>
              </Grid>
            </Grid>
          </form>
        );

      case 2:
        return (
          <Box className="text-center">
            <Typography variant="h5" className="mb-4">
              Commande confirmée !
            </Typography>
            <Typography variant="body1" className="mb-4">
              Merci pour votre commande. Vous recevrez un email de confirmation.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOrderComplete}
            >
              Retour à l'accueil
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Paper className="p-6">
        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box className="mb-8">
          <Typography variant="h5" className="mb-4">
            Résumé de la commande
          </Typography>
          {items.map((item) => (
            <Box key={item.id} className="flex justify-between mb-2">
              <Typography>
                {item.name} x {item.quantity}
              </Typography>
              <Typography>
                {(item.price * item.quantity).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </Typography>
            </Box>
          ))}
          <Divider className="my-4" />
          <Box className="flex justify-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">
              {total.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR'
              })}
            </Typography>
          </Box>
        </Box>

        {renderStepContent(activeStep)}
      </Paper>
    </Container>
  );
};

export default CheckoutForm;