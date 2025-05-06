import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import { 
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon 
} from '@mui/icons-material';
import { api } from '../../services/api';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/admin/dashboard');
        setStats(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Erreur lors du chargement des données');
        console.error('Error fetching dashboard data:', error);
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de Bord Admin
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/categories')}
            sx={{ mr: 2 }}
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
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {stats && (
        <>
          {/* Stats Overview */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'primary.light', color: 'white' }}>
                <Box display="flex" alignItems="center">
                  <PeopleIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" component="h2">
                      Utilisateurs
                    </Typography>
                    <Typography variant="h4">{stats.totalUsers}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'success.light', color: 'white' }}>
                <Box display="flex" alignItems="center">
                  <ShoppingCartIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" component="h2">
                      Commandes
                    </Typography>
                    <Typography variant="h4">{stats.totalOrders}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'warning.light', color: 'white' }}>
                <Box display="flex" alignItems="center">
                  <InventoryIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" component="h2">
                      Produits
                    </Typography>
                    <Typography variant="h4">{stats.totalProducts}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Recent Orders */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Commandes Récentes
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Utilisateur</TableCell>
                      <TableCell>Montant</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Statut</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.recentOrders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.username}</TableCell>
                        <TableCell>{order.totalAmount.toFixed(2)} €</TableCell>
                        <TableCell>
                          {new Date(order.orderDate).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>
                          <Box
                            component="span"
                            sx={{
                              px: 2,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: 
                                order.status === 'Livré' ? 'success.light' :
                                order.status === 'En cours' ? 'warning.light' :
                                'error.light',
                              color: 'white'
                            }}
                          >
                            {order.status}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>

            {/* Top Selling Products */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Produits les Plus Vendus
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Produit</TableCell>
                      <TableCell align="right">Ventes Totales</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.topSellingProducts.map((product) => (
                      <TableRow key={product.id} hover>
                        <TableCell>{product.name}</TableCell>
                        <TableCell align="right">
                          <Box
                            component="span"
                            sx={{
                              px: 2,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: 'primary.light',
                              color: 'white'
                            }}
                          >
                            {product.totalSold}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard;