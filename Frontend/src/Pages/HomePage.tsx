import React, { useEffect, useState } from 'react';
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import type { Product } from '../Types/Product.tsx';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(async (response)=>{
        const data = await response.json();
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
        {
        products.map(({_id, title, image, price}:Product) => (
          <Box key={_id}>
            <ProductCard _id={_id} title={title} image={image} price={price} />
          </Box>
        ))
        }
      </Box>
    </Container>
  );
}

export default HomePage