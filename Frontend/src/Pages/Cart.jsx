import React, { useState, useEffect } from 'react';
import { 
    Typography, 
    Container, 
    Card, 
    CardContent, 
    CardMedia, 
    Box, 
    Button, 
    IconButton,
    Grid,
    Divider,
    Alert
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { BaseUrl } from '../constants/BaseUrl'
import { useAuth } from '../context/Auth/AuthContext';


const Cart = () => {
    const { token } = useAuth();
    const [cart, setCart] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        if (!token) {
            setError('Please login to view your cart');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BaseUrl}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                setError(`Failed to fetch cart: ${response.statusText}`);
                return;
            }

            const data = await response.json();
            setCart(data);
        } catch (err) {
            setError(`Network error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productID, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const response = await fetch(`${BaseUrl}/cart/items`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productID,
                    quantity: newQuantity
                })
            });

            if (response.ok) {
                fetchCart(); // Refresh cart
            }
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    const removeItem = async (productID) => {
        try {
            const response = await fetch(`${BaseUrl}/cart/items/${productID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchCart(); // Refresh cart
            }
        } catch (err) {
            console.error('Error removing item:', err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    if (loading) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4">Loading...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Cart
            </Typography>
            
            {!cart || cart.items?.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        Your cart is empty
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Add some products to get started!
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {cart.items.map((item) => (
                            <Grid item xs={12} key={item.product}>
                                <Card sx={{ display: 'flex', p: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                                            <Typography variant="h6">
                                                Product ID: {item.product}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                ${item.unitPrice}
                                            </Typography>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton 
                                                onClick={() => updateQuantity(item.product, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography variant="body1" sx={{ minWidth: '20px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton 
                                                onClick={() => updateQuantity(item.product, item.quantity + 1)}
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>
                                        
                                        <Typography variant="body1" sx={{ minWidth: '80px', textAlign: 'right' }}>
                                            ${(item.unitPrice * item.quantity).toFixed(2)}
                                        </Typography>
                                        
                                        <IconButton 
                                            onClick={() => removeItem(item.product)}
                                            color="error"
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5">
                            Total: ${cart.totalAmount?.toFixed(2) || '0.00'}
                        </Typography>
                        <Button variant="contained" color="primary" size="large">
                            Proceed to Checkout
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
};
