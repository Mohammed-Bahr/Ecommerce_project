import { useRef, useState } from "react";
import { Box, Typography, Container, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to login");
        return;
      }

      if (!data.accessToken) {
        setError("Something went wrong. Please try again.");
        return;
      }

      login(email, data.accessToken);
      navigate("/");
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#1e3c72" }}>
            Welcome Back
          </Typography>
          <Box component="form" sx={{ width: "100%", mt: 1 }}>
            <TextField
              inputRef={emailRef}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              inputRef={passwordRef}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              onClick={onSubmit}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: 600,
                backgroundColor: "#1e3c72",
                "&:hover": {
                  backgroundColor: "#2a5298",
                },
              }}
            >
              Sign In
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => navigate("/register")}
                sx={{ textTransform: "none", color: "#666" }}
              >
                Don't have an account? Sign Up
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
