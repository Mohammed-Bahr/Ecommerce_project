import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Container, Button, Grid, Paper, Chip } from "@mui/material";
import { ShoppingCart, ArrowBack } from "@mui/icons-material";
import { BASE_URL } from "../constants/baseUrl";
import { Product } from "../types/Product";
import { useCart } from "../context/Cart/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState(false);
  const { addItemToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError(true);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product/${id}`);
        if (!response.ok) {
          setError(true);
          return;
        }
        const data = await response.json();
        setProduct(data);
      } catch {
        setError(true);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography color="error">Product not found</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addItemToCart(product._id);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src={product.image} 
              alt={product.title}
              sx={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: 2
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                {product.title}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Chip 
                  label={product.stock > 0 ? "In Stock" : "Out of Stock"} 
                  color={product.stock > 0 ? "success" : "error"} 
                  variant="outlined" 
                  sx={{ mr: 1 }}
                />
              </Box>

              <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
                ${product.price}
              </Typography>

              <Box sx={{ mt: 'auto' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetailsPage;
