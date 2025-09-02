import { Grid, Container, Box } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../Types/Product.ts";
import { BASE_URL } from "../constants/baseUrl";

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
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid size={{ xs: 12, md: 4 }} key={p._id}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;