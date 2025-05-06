import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, getProfile } from '../../store/slices/authSlice';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tabs,
  Tab,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const Account = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    username: '',
    createdAt: ''
  });
  const [editedInfo, setEditedInfo] = useState({...userInfo});

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const info = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        username: user.username || '',
        createdAt: user.createdAt || new Date().toISOString()
      };
      setUserInfo(info);
      setEditedInfo(info);
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo({...userInfo});
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(editedInfo)).unwrap();
      setUserInfo({...editedInfo});
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };

  const renderProfileField = (label, value, field) => (
    <Grid item xs={12} sm={6}>
      {isEditing ? (
        <TextField
          fullWidth
          label={label}
          value={editedInfo[field] || ''}
          onChange={(e) => setEditedInfo({ ...editedInfo, [field]: e.target.value })}
          disabled={field === 'email' || field === 'username' || field === 'createdAt' || field === 'accountType'}
          margin="normal"
          multiline={field === 'address'}
          rows={field === 'address' ? 2 : 1}
          required={field === 'firstName' || field === 'lastName'}
          helperText={
            (field === 'phoneNumber' && !editedInfo[field]) ? 'Recommandé pour la livraison' :
            (field === 'address' && !editedInfo[field]) ? 'Nécessaire pour la livraison' : ''
          }
        />
      ) : (
        <Box sx={{ mb: 3, backgroundColor: 'background.paper', p: 2, borderRadius: 1 }}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {label}
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              color: value ? 'text.primary' : 'text.secondary',
              fontStyle: value ? 'normal' : 'italic'
            }}
          >
            {field === 'createdAt' 
              ? new Date(value).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : value || 'À compléter'}
          </Typography>
        </Box>
      )}
    </Grid>
  );

  const renderProfile = () => (
    <Box>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profil mis à jour avec succès !
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6">Informations personnelles</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Gérez vos informations personnelles et de livraison
          </Typography>
        </Box>
        {!isEditing ? (
          <IconButton 
            color="primary" 
            onClick={handleEdit} 
            title="Modifier"
            sx={{ 
              backgroundColor: 'action.hover',
              '&:hover': { backgroundColor: 'action.selected' } 
            }}
          >
            <EditIcon />
          </IconButton>
        ) : (
          <Box>
            <IconButton 
              color="primary" 
              onClick={handleUpdateProfile} 
              title="Enregistrer"
              sx={{ mr: 1 }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton 
              color="error" 
              onClick={handleCancel} 
              title="Annuler"
            >
              <CancelIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            Identité
          </Typography>
          {renderProfileField('Nom d\'utilisateur', userInfo.username, 'username')}
          {renderProfileField('Email', userInfo.email, 'email')}
          {renderProfileField('Prénom', userInfo.firstName, 'firstName')}
          {renderProfileField('Nom', userInfo.lastName, 'lastName')}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            Informations de livraison
          </Typography>
          {renderProfileField('Adresse', userInfo.address, 'address')}
          {renderProfileField('Téléphone', userInfo.phoneNumber, 'phoneNumber')}
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Membre depuis le {new Date(userInfo.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const renderOrders = () => (
    <Typography>Historique des commandes</Typography>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Mon Compte
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 4 }}>
                <Tab label="Profil" />
                <Tab label="Commandes" />
              </Tabs>

              <Box>
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