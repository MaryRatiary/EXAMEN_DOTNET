import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  CircularProgress,
  Container,
  Paper,
  Breadcrumbs,
  Chip,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import { categoriesAPI } from '../../services/api';
import CategorySidebar from '../../components/CategorySidebar';
import ProductCard from '../../components/ProductCard';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        // Assurez-vous que les catégories sont bien structurées avec leurs sous-catégories
        const structuredCategories = response.data;
        setCategories(structuredCategories);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des catégories');
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (selectedCategory) {
        try {
          setLoading(true);
          const response = await categoriesAPI.getProducts(selectedCategory);
          setProducts(response.data);
        } catch (err) {
          setError('Erreur lors du chargement des produits');
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
      }
    };

    fetchCategoryProducts();
  }, [selectedCategory]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || 
                             categories.flatMap(cat => cat.subCategories || [])
                                      .find(subCat => subCat.id === selectedCategory);

  const getBreadcrumbPath = (category) => {
    if (!category) return [];
    const path = [];
    let current = category;
    while (current) {
      path.unshift(current);
      current = categories.find(cat => cat.id === current.parentCategoryId);
    }
    return path;
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        minHeight: 'calc(100vh - 70px)',
        mt: '70px',
        backgroundColor: '#f5f5f7'
      }}
    >
      {!isMobile && (
        <CategorySidebar 
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      )}
      
      <Box 
        component={Container} 
        maxWidth="xl" 
        sx={{ 
          flexGrow: 1, 
          p: 4,
          transition: 'all 0.3s ease'
        }}
      >
        {error && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              mb: 3, 
              backgroundColor: '#fff3f3',
              color: 'error.main',
              borderRadius: 2
            }}
          >
            <Typography>{error}</Typography>
          </Paper>
        )}

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            backgroundColor: 'white'
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2
            }}
          >
            {selectedCategoryData?.name || 'Toutes les catégories'}
          </Typography>

          {selectedCategoryData && (
            <Box sx={{ mb: 3 }}>
              <Breadcrumbs separator="›" sx={{ mb: 2 }}>
                {getBreadcrumbPath(selectedCategoryData).map((cat, index) => (
                  <Typography 
                    key={cat.id}
                    color={index === getBreadcrumbPath(selectedCategoryData).length - 1 ? 'primary' : 'inherit'}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' }
                    }}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    {cat.name}
                  </Typography>
                ))}
              </Breadcrumbs>
              {selectedCategoryData.description && (
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {selectedCategoryData.description}
                </Typography>
              )}
            </Box>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Fade in={!loading} timeout={500}>
              <Grid 
                container 
                spacing={3}
                sx={{ 
                  mt: 1,
                  animation: 'fadeIn 0.5s ease-in-out'
                }}
              >
                {products.map((product) => (
                  <Grid 
                    item 
                    key={product.id} 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={3}
                    sx={{
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      }
                    }}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
                {products.length === 0 && !loading && (
                  <Grid item xs={12}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 4, 
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        borderRadius: 2
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ 
                          fontStyle: 'italic',
                          fontSize: '1.1rem'
                        }}
                      >
                        Aucun produit dans cette catégorie
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Fade>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Categories;