import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/Auth/AuthContext';
import { useCart } from '../context/Cart/CartContext';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

export default function ProductCard({title , image , price, productId, onCartUpdate}) {
  const { token } = useAuth();
  const { addItemToCart, loading: cartLoading, error: cartError } = useCart();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleAddToCart = async () => {
    if (!token) {
      setNotification({ open: true, message: 'Please login to add items to cart', severity: 'error' });
      return;
    }

    try {
      await addItemToCart(productId);
      
      if (cartError) {
        setNotification({ open: true, message: cartError, severity: 'error' });
      } else {
        setNotification({ open: true, message: 'Item added to cart successfully!', severity: 'success' });
        if (onCartUpdate) {
          onCartUpdate();
        }
      }
    } catch (error) {
      setNotification({ open: true, message: 'Failed to add item to cart. Please try again.', severity: 'error' });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          onClick={handleAddToCart}
          disabled={cartLoading}
          variant="contained"
          color="primary"
        >
          {cartLoading ? 'Adding...' : 'Add To Cart'}
        </Button>
      </CardActions>
    </Card>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
