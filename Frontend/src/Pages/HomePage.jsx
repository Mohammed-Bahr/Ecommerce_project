import React , {useState, useEffect} from 'react'
import ProductCard from '../Components/ProductCard'
import { Container } from '@mui/material'
import {Grid} from '@mui/material'
import { BaseUrl } from '../constants/BaseUrl'
const HomePage = () => {
  const [products , setProducts] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching from:', `${BaseUrl}/products`); // Debug log
      try {
        const response = await fetch(`${BaseUrl}/products`);
        console.log('Response status:', response.status); // Debug log
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        console.log('Data type:', typeof data, 'Is array:', Array.isArray(data)); // Debug log

        setProducts(data.data);
      } 
      catch(err) {
        console.error('Fetch error:', err);
        setProducts([]);
      }
    };

    fetchData();
  }, []);

  
  if (!products || products.length === 0) return <div>Loading...</div>;

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {
          products.map(product => (
            <Grid item md={4} key={product._id}>
              <ProductCard title={product.title} image={product.image} price={product.price} />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

export default HomePage