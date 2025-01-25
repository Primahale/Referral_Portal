import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authService } from "../services/api";
import {Container,TextField,Button,Typography,Box,Alert,CircularProgress,} from "@mui/material";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values, { setSubmitting }) => {
    setErrorMessage(""); // Clear any previous error messages
    try {
      console.log("Registering with:", values); // Debugging information
      await authService.register(values.email, values.password); // Correct function call
      setSubmitting(false);
      navigate("/referrals"); // Redirect upon success
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while registering. Please try again."
      );
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  helperText={<ErrorMessage name="email" />}
                  error={Boolean(values.email && !Yup.string().email().isValid(values.email))}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  helperText={<ErrorMessage name="password" />}
                  error={Boolean(values.password && values.password.length < 6)}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  variant="outlined"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  helperText={<ErrorMessage name="confirmPassword" />}
                  error={
                    Boolean(
                      values.confirmPassword &&
                        values.confirmPassword !== values.password
                    )
                  }
                />
              </Box>
              {errorMessage && (
                <Box mb={2}>
                  <Alert severity="error">{errorMessage}</Alert>
                </Box>
              )}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? "Registering..." : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
        {/* Add navigation for Login */}
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "#007BFF",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Already have an account? Sign In
          </button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
