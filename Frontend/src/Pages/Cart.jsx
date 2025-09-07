import React, { useState, useEffect } from 'react'
import { Typography, Container } from '@mui/material'
import { BaseUrl } from '../constants/BaseUrl'
import { useAuth } from '../context/Auth/AuthContext'


const Cart = () => {
    const { token } = useAuth();
    const [cart, setCart] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

        try {
            if(!token){
                setError('missing token')
            }
            const fetchCart = async () => {
                const response = await fetch(`${BaseUrl}/cart`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    setError(`Faild to fetching user cart -> ${response.statusText}`)
                }

                const data = await response.json();
                setCart(data);
            };

            fetchCart();
        } catch (err) {
            setError(err);
        }


    },[])

    console.log({cart});
    return (
        <Container>
            <Typography variant='h4'>My Cart</Typography>
        </Container>
    );
};

export default Cart