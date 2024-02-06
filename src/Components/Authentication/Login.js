import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Update the import for login
import { auth } from '../../firebase';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Check if email or password is empty
    if (!email || !password) {
      toast.error("Email and password cannot be empty");
      return;
    }

    // Perform login logic here
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      toast.success(`Welcome  ✅`);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    }
    // Close the login modal or perform any other action
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <TextField
        variant="outlined"
        type="password"
        label="Password"
        value={password}
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" style={{ backgroundColor: "#4CAF50" }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
