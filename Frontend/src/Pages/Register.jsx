import { Container, Box, Typography, TextField, Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import { BaseUrl } from '../constants/BaseUrl';

const Register = () => {
  const [error, setError] = useState("");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const onSubmit = async () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!firstName || !lastName || !email || !password) {
      setError("Check submitted data.");
      return;
    }

    const v = isValidEmail(email);

    if(!v){
      console.log('error email format');
      setError('Enter valid email');
      return;
    }


    try {
      const response = await fetch(`http://localhost:3001/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data || `unable to register user, please try different credentials ${response.statusText}`);
        return;
      }

      if (!data) {
        setError("Incorrect token");
        return;
      }

      console.log("Registration successful:", data);
      // You might want to redirect to login page or dashboard here
      // Example: window.location.href = '/login';
    } catch (err) {
      console.log(`error shows while fetching data -> ${err}`);
      setError(`Network error: ${err.message}`);
    }

    setError("");

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
        <Typography variant="h6">Register New Account</Typography>
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
          <TextField
            inputRef={firstNameRef}
            label="First Name"
            name="firstName"
          />
          <TextField inputRef={lastNameRef} label="Last Name" name="lastName" />
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            name="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  )
}

export default Register
