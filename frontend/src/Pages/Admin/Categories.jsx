import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Card,
  CardMedia,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ImageUpload from '../../components/ImageUpload';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ 
    name: '', 
    description: '', 
    imageUrl: '',
    parentCategoryId: ''
  });
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const { token } = useSelector((state) => state.auth);
  const [viewMode, setViewMode] = useState('all'); // 'all' ou 'tree'

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/categories');
      setCategories(response.data);
    } catch (error) {
      showAlert('error', 'Erreur lors du chargement des catégories');
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description || '',
      imageUrl: category.imageUrl || '',
      parentCategoryId: category.parentCategoryId || ''
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleCreateOrUpdateCategory = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:5050/api/admin/categories/${selectedCategory.id}`,
          newCategory,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        showAlert('success', 'Catégorie mise à jour avec succès');
      } else {
        await axios.post(
          'http://localhost:5050/api/admin/categories',
          newCategory,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        showAlert('success', 'Catégorie créée avec succès');
      }
      setOpen(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      showAlert('error', 'Erreur lors de l\'enregistrement de la catégorie');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Toutes les sous-catégories seront également supprimées.')) {
      try {
        await axios.delete(`http://localhost:5050/api/admin/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showAlert('success', 'Catégorie supprimée avec succès');
        fetchCategories();
      } catch (error) {
        showAlert('error', 'Erreur lors de la suppression de la catégorie');
      }
    }
  };

  const resetForm = () => {
    setNewCategory({ 
      name: '', 
      description: '', 
      imageUrl: '', 
      parentCategoryId: '' 
    });
    setEditMode(false);
    setSelectedCategory(null);
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  const getParentPath = (category) => {
    if (!category.path) return '';
    const parts = category.path.split('/');
    return parts.slice(0, -1).join(' > ');
  };

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

  const renderCategoryTree = (category, level = 0) => (
    <Box key={category.id} sx={{ ml: level * 3 }}>
      <Card sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, objectFit: 'cover' }}
          image={category.imageUrl || '/placeholder.jpg'}
          alt={category.name}
        />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h6">{category.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description || 'Aucune description'}
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <IconButton
            color="primary"
            onClick={() => handleEditCategory(category)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteCategory(category.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
      {category.children?.map(child => renderCategoryTree(child, level + 1))}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Gestion des Catégories
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => setViewMode(viewMode === 'all' ? 'tree' : 'all')}
          >
            {viewMode === 'all' ? 'Vue arborescente' : 'Vue simple'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
          >
            Nouvelle Catégorie
          </Button>
        </Box>
      </Box>

      {alert.show && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      {viewMode === 'tree' ? (
        <Box>
          {buildCategoryTree(categories).map(category => renderCategoryTree(category))}
        </Box>
      ) : (
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={category.imageUrl || '/placeholder.jpg'}
                  alt={category.name}
                  sx={{ objectFit: 'cover' }}
                />
                <Box sx={{ p: 2 }}>
                  {category.parentCategoryId && (
                    <Chip 
                      label={getParentPath(category)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  )}
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {category.description || 'Aucune description'}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditCategory(category)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog 
        open={open} 
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editMode ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              label="Nom de la catégorie"
              fullWidth
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Catégorie parente</InputLabel>
              <Select
                value={newCategory.parentCategoryId}
                onChange={(e) => setNewCategory({ ...newCategory, parentCategoryId: e.target.value })}
                label="Catégorie parente"
              >
                <MenuItem value="">
                  <em>Aucune (catégorie principale)</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem 
                    key={category.id} 
                    value={category.id}
                    disabled={editMode && category.id === selectedCategory?.id}
                  >
                    {category.path}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <ImageUpload
              currentImage={newCategory.imageUrl}
              onImageSelect={(imageData) => setNewCategory({ ...newCategory, imageUrl: imageData })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setOpen(false);
              resetForm();
            }}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleCreateOrUpdateCategory} 
            color="primary"
            variant="contained"
          >
            {editMode ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminCategories;