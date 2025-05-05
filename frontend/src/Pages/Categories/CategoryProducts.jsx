import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import { categoriesAPI } from '../../services/api';
import ProductCard from '../../components/ProductCard';

const CategoryProducts = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const [categoryResponse, productsResponse] = await Promise.all([
          categoriesAPI.getById(id),
          categoriesAPI.getProducts(id)
        ]);
        setCategory(categoryResponse.data);
        setProducts(productsResponse.data);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {category?.name}
      </Typography>
      {category?.description && (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          {category.description}
        </Typography>
      )}
      
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
        {products.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="text.secondary">
              Aucun produit dans cette catégorie
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CategoryProducts;