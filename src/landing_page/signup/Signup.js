import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();
const API = process.env.REACT_APP_API_URL;

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/signup`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        toast.success("Signup successful!", { position: "top-right" });
        setFormData({ name: "", email: "", password: "" });

        // 2 sec wait then redirect
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data?.message || "Signup failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Create Your Account
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2, width: "100%" }}
          >
  

            <Box display="flex" justifyContent="center">
              <TextField
                variant="outlined"
                // size="small"
                sx={{ m: 1, width: "70%" }}
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <TextField
                variant="outlined"
                // size="small"
                sx={{ m: 1, width: "70%" }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <TextField
                variant="outlined"
                // size="small"
                sx={{ m: 1, width: "70%" }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                mb: 2,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
