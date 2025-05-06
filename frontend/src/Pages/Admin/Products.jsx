import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ImageUpload from '../../components/ImageUpload';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const { token } = useSelector((state) => state.auth);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    imageUrl: '',
    stock: '',
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/products');
      setProducts(response.data);
    } catch (error) {
      showAlert('error', 'Erreur lors du chargement des produits');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/categories');
      setCategories(response.data);
    } catch (error) {
      showAlert('error', 'Erreur lors du chargement des catégories');
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      categoryId: product.categoryId,
      imageUrl: product.imageUrl || '',
      stock: product.stock.toString(),
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleCreateOrUpdateProduct = async () => {
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        categoryId: parseInt(newProduct.categoryId),
      };

      if (editMode && selectedProduct) {
        await axios.put(
          `http://localhost:5050/api/admin/products/${selectedProduct.id}`,
          productData,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        showAlert('success', 'Produit mis à jour avec succès');
      } else {
        await axios.post(
          'http://localhost:5050/api/admin/products',
          productData,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        showAlert('success', 'Produit créé avec succès');
      }
      setOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      showAlert('error', 'Erreur lors de l\'enregistrement du produit');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await axios.delete(`http://localhost:5050/api/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showAlert('success', 'Produit supprimé avec succès');
        fetchProducts();
      } catch (error) {
        showAlert('error', 'Erreur lors de la suppression du produit');
      }
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      categoryId: '',
      imageUrl: '',
      stock: '',
    });
    setEditMode(false);
    setSelectedProduct(null);
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.categoryId === parseInt(selectedCategory));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Gestion des Produits
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          Nouveau Produit
        </Button>
      </Box>

      {alert.show && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Filtrer par catégorie</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Filtrer par catégorie"
        >
          <MenuItem value="all">Toutes les catégories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl || '/placeholder.jpg'}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description || 'Aucune description'}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="primary">
                    Prix: {product.price.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </Typography>
                  <Typography variant="body2">
                    Stock: {product.stock} unités
                  </Typography>
                  <Typography variant="body2">
                    Catégorie: {categories.find(c => c.id === product.categoryId)?.name || 'Non catégorisé'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditProduct(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
          {editMode ? 'Modifier le produit' : 'Nouveau produit'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              label="Nom du produit"
              fullWidth
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Prix"
                  type="number"
                  fullWidth
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  InputProps={{
                    startAdornment: '€',
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Stock"
                  type="number"
                  fullWidth
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel>Catégorie</InputLabel>
              <Select
                value={newProduct.categoryId}
                onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                label="Catégorie"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ImageUpload
              currentImage={newProduct.imageUrl}
              onImageSelect={(imageData) => setNewProduct({ ...newProduct, imageUrl: imageData })}
            />
            {newProduct.imageUrl && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={newProduct.imageUrl}
                  alt="Aperçu"
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              </Box>
            )}
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
            onClick={handleCreateOrUpdateProduct} 
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

export default Products;