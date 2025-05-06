import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress, Breadcrumbs } from '@mui/material';
import { categoriesAPI } from '../../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        setCategories(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des catégories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Organiser les catégories en arbre
  const buildCategoryTree = (categories) => {
    const categoryMap = {};
    const rootCategories = [];

    // Créer un map de toutes les catégories
    categories.forEach(category => {
      categoryMap[category.id] = { ...category, children: [] };
    });

    // Construire l'arbre
    categories.forEach(category => {
      if (category.parentCategoryId) {
        const parent = categoryMap[category.parentCategoryId];
        if (parent) {
          parent.children.push(categoryMap[category.id]);
        }
      } else {
        rootCategories.push(categoryMap[category.id]);
      }
    });

    return rootCategories;
  };

  const renderCategoryCard = (category, level = 0) => (
    <React.Fragment key={category.id}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card 
          component={Link} 
          to={`/categories/${category.id}`}
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            textDecoration: 'none',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <CardMedia
            component="img"
            height="240"
            image={category.imageUrl || '/placeholder.jpg'}
            alt={category.name}
            sx={{ 
              objectFit: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2" color="primary.main">
              {category.name}
            </Typography>
            {category.path && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {category.path.split('/').join(' > ')}
              </Typography>
            )}
            {category.description && (
              <Typography variant="body2" color="text.secondary">
                {category.description}
              </Typography>
            )}
            {category.children?.length > 0 && (
              <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
                {category.children.length} sous-catégorie{category.children.length > 1 ? 's' : ''}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      {category.children?.map(child => renderCategoryCard(child, level + 1))}
    </React.Fragment>
  );

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

  const categoryTree = buildCategoryTree(categories);

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Nos Catégories
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
          Découvrez notre sélection de pierres précieuses et de bijoux artisanaux, soigneusement organisée par catégories pour faciliter votre navigation
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {categoryTree.map(category => renderCategoryCard(category))}
      </Grid>
    </Container>
  );
};

export default Categories;