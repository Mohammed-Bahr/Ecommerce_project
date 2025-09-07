import { Container, Box, Typography, TextField, Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import { BaseUrl } from '../constants/BaseUrl';
import { useAuth } from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const Login = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const { login } = useAuth();

    const onSubmit = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            setError("Check submitted data.");
            return;
        }

        const v = isValidEmail(email);

        if (!v) {
            console.log('error email format');
            setError('Enter valid email');
            return;
        }


        try {
            const response = await fetch(`http://localhost:3001/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.data || `Unable to login user, please try different credentials. Status: ${response.status}`);
                return;
            }

            const data = await response.json();
            console.log("login successful:", data);
            login(email, data.data); // Use email as username, data.data as token
            setError(""); // Clear error on success
            setSuccess(true);

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            console.log(`Error while fetching data -> ${err}`);
            setError(`Network error: ${err.message}`);
            return;
        }

    };

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4,
                }}
            >
                <Typography variant="h6">Login to your Account</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 2,
                        border: 1,
                        borderColor: "#f5f5f5",
                        p: 2,
                    }}
                >

                    <TextField inputRef={emailRef} label="Email" name="email" />
                    <TextField
                        inputRef={passwordRef}
                        type="password"
                        label="Password"
                        name="password"
                    />
                    <Button onClick={
                        onSubmit
                    } variant="contained">
                        Login
                    </Button>
                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert
                            icon={<CheckIcon fontSize="inherit" />}
                            severity="success"
                        >
                            Login successful! Redirecting...
                        </Alert>
                    )}
                </Box>
            </Box>
        </Container>
    )
}

export default Login
