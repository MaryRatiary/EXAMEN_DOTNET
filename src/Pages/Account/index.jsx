import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const Account = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userInfo, setUserInfo] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    address: '123 rue des Lilas',
    city: 'Paris',
    postalCode: '75001',
    country: 'France'
  });

  // Exemple de commandes (à remplacer par les vraies données)
  const orders = [
    {
      id: 'CMD001',
      date: '2025-05-01',
      total: 299.99,
      status: 'Livré',
      items: [
        { name: 'Saphir Bleu', quantity: 1, price: 299.99 }
      ]
    },
    {
      id: 'CMD002',
      date: '2025-05-03',
      total: 799.98,
      status: 'En cours',
      items: [
        { name: 'Rubis Rouge', quantity: 2, price: 399.99 }
      ]
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Implémenter la mise à jour du profil
    console.log('Profile update:', userInfo);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Livré':
        return 'success';
      case 'En cours':
        return 'primary';
      case 'Annulé':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderProfile = () => (
    <form onSubmit={handleUpdateProfile}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Prénom"
            value={userInfo.firstName}
            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nom"
            value={userInfo.lastName}
            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Téléphone"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Adresse"
            value={userInfo.address}
            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ville"
            value={userInfo.city}
            onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Code Postal"
            value={userInfo.postalCode}
            onChange={(e) => setUserInfo({ ...userInfo, postalCode: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Pays"
            value={userInfo.country}
            onChange={(e) => setUserInfo({ ...userInfo, country: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Mettre à jour le profil
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const renderOrders = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Commande</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Détails</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                {new Date(order.date).toLocaleDateString('fr-FR')}
              </TableCell>
              <TableCell>
                {order.total.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => console.log('View order:', order.id)}
                >
                  Voir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-6">
        Mon Compte
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className="mb-4"
              >
                <Tab label="Profil" />
                <Tab label="Commandes" />
              </Tabs>

              <Box className="mt-4">
                {activeTab === 0 ? renderProfile() : renderOrders()}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;