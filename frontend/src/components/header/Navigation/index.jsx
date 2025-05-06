import React, { useState, useEffect } from 'react';
import { Button, IconButton, InputBase, Badge, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { logout } from '../../../store/slices/authSlice';
import axios from 'axios';
import "./style.css";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchCategories();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Bloquer le scroll quand le menu mobile est ouvert
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : 'U';
  };

  return (
    <header className={`${isScrolled ? 'scrolled' : ''}`}>
      <nav>
        <div className="container mx-auto px-4">
          {/* Top bar with logo and search */}
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo and hamburger menu */}
            <div className="flex items-center gap-4">
              <IconButton 
                className="lg:hidden"
                onClick={toggleMenu}
                aria-label="Menu"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </IconButton>
              
              <Link to="/" className="logo-container">
                <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain rounded-xl" />
              </Link>
            </div>

            {/* Search bar - hidden on mobile */}
            <form 
              onSubmit={handleSearch}
              className="hidden md:flex items-center flex-1 max-w-md mx-4 bg-gray-100 rounded-full px-4"
            >
              <InputBase
                placeholder="Rechercher des produits..."
                className="flex-1 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton type="submit" aria-label="search">
                <FiSearch />
              </IconButton>
            </form>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              {/* Search button for mobile */}
              <IconButton 
                className="md:hidden"
                onClick={() => navigate('/search')}
                aria-label="search"
              >
                <FiSearch />
              </IconButton>

              {/* Cart button with badge */}
              <IconButton 
                onClick={() => navigate('/cart')}
                aria-label="panier"
                className="relative"
              >
                <Badge badgeContent={0} color="primary">
                  <FiShoppingCart />
                </Badge>
              </IconButton>

              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  {user.isAdmin && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate('/admin/dashboard')}
                    >
                      Dashboard
                    </Button>
                  )}
                  <div className="flex items-center gap-2">
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        cursor: 'pointer'
                      }}
                      onClick={() => navigate('/account')}
                    >
                      {getInitials(user.username)}
                    </Avatar>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleLogout}
                      size="small"
                    >
                      Déconnexion
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => navigate('/auth/login')}
                    startIcon={<FiUser />}
                  >
                    Connexion
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/auth/register')}
                  >
                    S'inscrire
                  </Button>
                </div>
              )}

              {/* Profile icon for mobile */}
              {user ? (
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    cursor: 'pointer',
                    display: { md: 'none' }
                  }}
                  onClick={() => navigate('/account')}
                >
                  {getInitials(user.username)}
                </Avatar>
              ) : (
                <IconButton 
                  className="md:hidden"
                  onClick={() => navigate('/auth/login')}
                  aria-label="profile"
                >
                  <FiUser />
                </IconButton>
              )}
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <div className="nav-menu-container">
          <div className="container mx-auto px-4">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Accueil</Link>
              </li>
              <li className="nav-item">
                <Link to="/categories" className="nav-link">
                  Catégories
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">À Propos</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <>
            <div className="mobile-menu-backdrop" onClick={() => setIsOpen(false)} />
            <div className="mobile-menu">
              <div className="container mx-auto px-4">
                <ul className="nav-menu flex flex-col gap-4">
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Accueil</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/categories" className="nav-link" onClick={() => setIsOpen(false)}>
                      Catégories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>À Propos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
