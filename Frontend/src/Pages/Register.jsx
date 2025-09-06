import { Container, Box, Typography, TextField, Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import { BaseUrl } from '../constants/BaseUrl';
import { useAuth } from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const Register = () => {
  const [error, setError] = useState("");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const { login } = useAuth();

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

    if (!v) {
      console.log('error email format');
      setError('Enter valid email');
      return;
    }


    try {
      const response = await fetch(`${BaseUrl}/users/register`, {
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
      })

      if (!response.ok) {
        setError(`Unable to register user, please try different credentials. Status: ${response.status}`);
        return;
      }

      const data = await response.json();

      // if (data && data.data) {
      //   console.log("Registration successful:", data.data);
      //   login(email, data.data); // Use email as username, data.data as token
      //   setError(""); // Clear error on success
      //   alert("Registration successful!");
      // } else {
      //   setError("Registration failed: Invalid response from server");
      // }
      console.log("Registration successful:", data);
      login(email, data); // Use email as username, data as token
      setError(""); // Clear error on success
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Registration successful!
      </Alert>
      navigate('/login');

    } catch (err) {
      console.log(`Error while fetching data -> ${err}`);
      setError(`Network error: ${err.message}`);
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
