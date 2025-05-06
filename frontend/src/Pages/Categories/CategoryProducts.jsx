import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  CircularProgress, 
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { categoriesAPI } from '../../services/api';
import ProductCard from '../../components/ProductCard';

const CategoryProducts = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const [categoryResponse, productsResponse, allCategoriesResponse] = await Promise.all([
          categoriesAPI.getById(id),
          categoriesAPI.getProducts(id),
          categoriesAPI.getAll()
        ]);
        
        setCategory(categoryResponse.data);
        setProducts(productsResponse.data);
        
        // Filtrer les sous-catégories
        const subs = allCategoriesResponse.data.filter(cat => cat.parentCategoryId === id);
        setSubCategories(subs);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [id]);

  const renderBreadcrumbs = () => {
    if (!category?.path) return null;
    
    const paths = category.path.split('/');
    const breadcrumbs = paths.map((name, index) => {
      const isLast = index === paths.length - 1;
      const categoryId = category.pathIds ? category.pathIds[index] : null;
      
      return isLast ? (
        <Typography key={index} color="text.primary">
          {name}
        </Typography>
      ) : (
        <MuiLink
          key={index}
          component={Link}
          to={categoryId ? `/categories/${categoryId}` : '/categories'}
          color="inherit"
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          {name}
        </MuiLink>
      );
    });

    return (
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
        <MuiLink
          component={Link}
          to="/categories"
          color="inherit"
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          Catégories
        </MuiLink>
        {breadcrumbs}
      </Breadcrumbs>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
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
      {renderBreadcrumbs()}
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {category?.name}
        </Typography>
        {category?.description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {category.description}
          </Typography>
        )}
      </Box>

      {subCategories.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Sous-catégories
          </Typography>
          <Grid container spacing={4}>
            {subCategories.map((subCat) => (
              <Grid item key={subCat.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  component={Link}
                  to={`/categories/${subCat.id}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={subCat.imageUrl || '/placeholder.jpg'}
                    alt={subCat.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {subCat.name}
                    </Typography>
                    {subCat.description && (
                      <Typography variant="body2" color="text.secondary">
                        {subCat.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Produits{products.length > 0 ? ` (${products.length})` : ''}
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {products.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" align="center">
              Aucun produit dans cette catégorie
            </Typography>
          </Grid>
        ) : (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default CategoryProducts;