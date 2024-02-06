import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Make sure this import is correct
import { auth } from '../../firebase';

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    // Perform signup logic here
    if (password !== confirmPassword) {
      console.log("password do not match");
      toast.error("password do not match");
      return;
    }

    // Add your signup logic and validation here
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result);
      toast.success(`Welcome, ${email}  ✅`);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    }
    // Close the signup modal or perform any other action
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

      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        fullWidth
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button variant="contained" style={{ backgroundColor: "#EEBC1D" }} onClick={handleSignup}>
        Signup
      </Button>
    </Box>
  );
};

export default Signup;
