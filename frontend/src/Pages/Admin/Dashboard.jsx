import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { adminAPI } from '../../services/api';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await adminAPI.getDashboardStats();
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement des données');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.isAdmin) {
      fetchDashboardData();
    }
  }, [user]);

  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Tableau de Bord Admin
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => navigate('/admin/categories')}
          >
            Gérer les Catégories
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/products')}
          >
            Gérer les Produits
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {stats && (
        <>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Utilisateurs
                </Typography>
                <Typography variant="h4">
                  {stats.totalUsers}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Commandes
                </Typography>
                <Typography variant="h4">
                  {stats.totalOrders}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Produits
                </Typography>
                <Typography variant="h4">
                  {stats.totalProducts}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Commandes récentes
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Montant</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Statut</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.username}</TableCell>
                          <TableCell>
                            {order.totalAmount.toLocaleString('fr-FR', {
                              style: 'currency',
                              currency: 'EUR'
                            })}
                          </TableCell>
                          <TableCell>
                            {new Date(order.orderDate).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>{order.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Produits les plus vendus
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Produit</TableCell>
                        <TableCell align="right">Vendus</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.topSellingProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell align="right">{product.totalSold}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard;