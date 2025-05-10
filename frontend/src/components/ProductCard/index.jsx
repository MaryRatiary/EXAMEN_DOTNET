import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Rating, 
  Box,
  IconButton,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Grow in={true} timeout={500}>
      <Card 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          maxHeight: '450px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: 'white',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
          }
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.imageUrl || '/placeholder.jpg'}
            alt={product.name}
            sx={{
              objectFit: 'cover',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              ...(isHovered && {
                transform: 'scale(1.1)',
              })
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 1,
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'translateX(0)' : 'translateX(100%)',
            }}
          >
            <Zoom in={isHovered} timeout={300}>
              <IconButton
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,1)',
                  },
                  transform: isFavorite ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <FavoriteIcon color={isFavorite ? "error" : "action"} />
              </IconButton>
            </Zoom>
            <Zoom in={isHovered} timeout={400}>
              <IconButton
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,1)',
                  }
                }}
              >
                <ShareIcon />
              </IconButton>
            </Zoom>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
              p: 1,
              transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.3s ease',
            }}
          >
            <Rating 
              value={product.rating || 0} 
              readOnly 
              precision={0.5} 
              size="small"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#FFB400',
                }
              }}
            />
          </Box>
        </Box>

        <CardContent 
          sx={{ 
            flexGrow: 1, 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box sx={{ mb: 0.5 }}>
            <Typography 
              variant="overline" 
              color="primary"
              sx={{ 
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: 1,
              }}
            >
              {product.category || 'Pierre précieuse'}
            </Typography>
          </Box>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.2,
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '0.8rem',
              lineHeight: 1.3,
              mb: 1,
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mt: 'auto'
          }}>
            <Typography 
              variant="h6" 
              color="primary" 
              sx={{ 
                fontWeight: 700,
                fontSize: '1.1rem'
              }}
            >
              {product.price.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR'
              })}
            </Typography>

            <Box sx={{ 
              display: 'flex',
              gap: 1
            }}>
              <Fade in={isHovered} timeout={300}>
                <Button 
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(`/product/${product.id}`)}
                  sx={{
                    minWidth: 'auto',
                    padding: '4px 8px',
                    borderRadius: '8px',
                  }}
                >
                  <VisibilityIcon fontSize="small" />
                </Button>
              </Fade>
              <Button 
                variant="contained"
                size="small"
                onClick={handleAddToCart}
                sx={{
                  minWidth: 'auto',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
                  }
                }}
              >
                <ShoppingCartIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
};

export default ProductCard;