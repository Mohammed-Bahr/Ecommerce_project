import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/Auth/AuthContext';
import { BaseUrl } from '../constants/BaseUrl';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

export default function ProductCard({title , image , price, productId, onCartUpdate}) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleAddToCart = async () => {
    if (!token) {
      setNotification({ open: true, message: 'Please login to add items to cart', severity: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/cart/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productID: productId,
          quantity: 1
        })
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ open: true, message: 'Item added to cart successfully!', severity: 'success' });
        if (onCartUpdate) {
          onCartUpdate();
        }
      } else {
        setNotification({ open: true, message: data || 'Failed to add item to cart', severity: 'error' });
      }
    } catch (error) {
      setNotification({ open: true, message: 'Network error. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
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
          disabled={loading}
          variant="contained"
          color="primary"
        >
          {loading ? 'Adding...' : 'Add To Cart'}
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
