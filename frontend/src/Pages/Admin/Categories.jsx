import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemText,
  IconButton,
  Breadcrumbs,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  FolderOpen as FolderIcon,
} from '@mui/icons-material';
import ImageUpload from '../../components/ImageUpload';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    parentCategoryId: null,
  });
  const [categoryPath, setCategoryPath] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (parentId = null) => {
    try {
      setError('');
      let response;
      if (parentId === null) {
        response = await adminAPI.getCategories(true);
        setCategories(Array.isArray(response.data) ? response.data : []);
      } else {
        response = await adminAPI.getCategoryById(parentId);
        setCategories(response.data.subCategories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Erreur lors du chargement des catégories');
    }
  };

  const handleNavigateToCategory = async (category) => {
    try {
      setError('');
      setCurrentCategory(category);
      setCategoryPath([...categoryPath, category]);
      await fetchCategories(category.id);
    } catch (error) {
      console.error('Error navigating to category:', error);
      setError('Erreur lors de la navigation vers la catégorie');
    }
  };

  const handleNavigateBack = async () => {
    try {
      setError('');
      const newPath = [...categoryPath];
      newPath.pop();
      setCurrentCategory(newPath[newPath.length - 1] || null);
      setCategoryPath(newPath);
      await fetchCategories(newPath[newPath.length - 1]?.id || null);
    } catch (error) {
      console.error('Error navigating back:', error);
      setError('Erreur lors du retour à la catégorie précédente');
    }
  };

  const handleOpenDialog = (category = null) => {
    setError('');
    if (category) {
      setCategoryData({
        id: category.id,
        name: category.name,
        description: category.description || '',
        imageUrl: category.imageUrl || '',
        parentCategoryId: category.parentCategoryId,
      });
      setEditMode(true);
    } else {
      setCategoryData({
        name: '',
        description: '',
        imageUrl: '',
        parentCategoryId: currentCategory?.id || null,
      });
      setEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCategoryData({
      name: '',
      description: '',
      imageUrl: '',
      parentCategoryId: currentCategory?.id || null,
    });
    setEditMode(false);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      setError('');
      if (editMode) {
        // Utiliser l'id stocké dans categoryData pour la mise à jour
        await adminAPI.updateCategory(categoryData.id, {
          name: categoryData.name,
          description: categoryData.description,
          imageUrl: categoryData.imageUrl
        });
      } else {
        await adminAPI.createCategory(categoryData);
      }
      handleCloseDialog();
      await fetchCategories(currentCategory?.id || null);
    } catch (error) {
      console.error('Error saving category:', error);
      setError(error.response?.data?.message || 'Erreur lors de l\'enregistrement de la catégorie');
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        setError('');
        await adminAPI.deleteCategory(categoryId);
        await fetchCategories(currentCategory?.id || null);
      } catch (error) {
        console.error('Error deleting category:', error);
        setError(error.response?.data?.message || 'Impossible de supprimer une catégorie qui contient des sous-catégories');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box mb={3}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            disabled={categoryPath.length === 0}
            onClick={handleNavigateBack}
            startIcon={<ArrowBackIcon />}
          >
            Retour
          </Button>
          {categoryPath.map((cat) => (
            <Typography key={cat.id} color="text.primary">
              {cat.name}
            </Typography>
          ))}
        </Breadcrumbs>
      </Box>

      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Ajouter une {currentCategory ? 'sous-' : ''}catégorie
        </Button>
      </Box>

      <List>
        {categories.map((category) => (
          <Card key={category.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" style={{ flex: 1 }}>
                  <FolderIcon style={{ marginRight: '10px' }} />
                  <ListItemText
                    primary={category.name}
                    secondary={
                      <>
                        {category.description}
                        <br />
                        {`${category.subCategories.length} sous-catégories, ${category.productCount} produits`}
                      </>
                    }
                  />
                </Box>
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleNavigateToCategory(category)}
                  >
                    <FolderIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(category.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
        {categories.length === 0 && (
          <Typography color="text.secondary" align="center">
            Aucune catégorie trouvée
          </Typography>
        )}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom"
            type="text"
            fullWidth
            value={categoryData.name}
            onChange={(e) =>
              setCategoryData({ ...categoryData, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={categoryData.description}
            onChange={(e) =>
              setCategoryData({ ...categoryData, description: e.target.value })
            }
          />
          <ImageUpload
            currentImage={categoryData.imageUrl}
            onImageSelect={(imageData) => setCategoryData({ ...categoryData, imageUrl: imageData })}
          />             
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button 
            onClick={handleSubmit} 
            color="primary"
            disabled={!categoryData.name.trim()}
          >
            {editMode ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}