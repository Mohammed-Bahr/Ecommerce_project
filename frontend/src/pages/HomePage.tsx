import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import { Box, Button, Typography } from "@mui/material";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if(error) {
    return <Box>Something went wrong, please try again!</Box>
  }

  return (
    <Container sx={{ mt: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        mb: 4, 
        p: 6, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        borderRadius: 4, 
        color: 'white',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Welcome to Tech Hub
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
          Discover the latest gadgets and electronics at unbeatable prices.
        </Typography>
        <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: '#764ba2', fontWeight: 'bold', '&:hover': { bgcolor: '#f0f0f0' } }}>
          Shop Now
        </Button>
      </Box>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
        Featured Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item md={4} key={p._id}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
