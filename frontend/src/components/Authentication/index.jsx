import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  Alert,
  Card,
  CardContent,
  Divider,
} from '@mui/material';

const Authentication = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
    setSuccess('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Implémenter la logique de connexion ici
    console.log('Login submitted:', loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    // Implémenter la logique d'inscription ici
    console.log('Register submitted:', registerData);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="sm" className="py-8">
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h4" className="text-center mb-6">
            {activeTab === 0 ? 'Connexion' : 'Créer un compte'}
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            className="mb-4"
          >
            <Tab label="Se connecter" />
            <Tab label="S'inscrire" />
          </Tabs>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className="mb-4">
              {success}
            </Alert>
          )}

          {activeTab === 0 ? (
            // Formulaire de connexion
            <form onSubmit={handleLoginSubmit}>
              <Box className="space-y-4">
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Mot de passe"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Se connecter
                </Button>
              </Box>
            </form>
          ) : (
            // Formulaire d'inscription
            <form onSubmit={handleRegisterSubmit}>
              <Box className="space-y-4">
                <TextField
                  required
                  fullWidth
                  label="Prénom"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Mot de passe"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Confirmer le mot de passe"
                  name="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Créer un compte
                </Button>
              </Box>
            </form>
          )}

          <Divider className="my-4" />
          
          <Box className="text-center">
            <Typography variant="body2" color="text.secondary">
              {activeTab === 0 ? (
                "Vous n'avez pas de compte ?"
              ) : (
                "Vous avez déjà un compte ?"
              )}
              <Button
                color="primary"
                onClick={() => setActiveTab(activeTab === 0 ? 1 : 0)}
              >
                {activeTab === 0 ? "S'inscrire" : "Se connecter"}
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Authentication;