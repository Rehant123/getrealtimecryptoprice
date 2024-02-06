import React, { useContext } from 'react';
import { Container, AppBar, Toolbar, Typography, Select, MenuItem, styled, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { useState } from 'react';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './UserSidebar';

const Title = styled(Typography)({
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer',
});

const Header = () => {
  //import the global state from the context
  const cryptostate = CryptoState();
  const {currency,symbol,setCurrency,user} = cryptostate;

  
  const navigate = useNavigate();

 const darkTheme=createTheme({
  palette:{
    mode:"dark",
  }
 })
  return (
    <ThemeProvider theme = {darkTheme}>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Title onClick={() =>{
            navigate("/")
         
          }}>Crypto Hunter</Title>
        <Select
         variant="outlined"
         labelId="demo-simple-select-label"
  onChange={(e) => setCurrency(e.target.value)}
  value={currency}
  style={{ width: "85px", height: "40px", marginLeft: "15px" }}
  id="demo-simple-select" 
>
  <MenuItem value={"USD"}>USD</MenuItem>
  <MenuItem value={"INR"}>INR</MenuItem>
</Select>

            
          {user?<UserSidebar/>:<AuthModal></AuthModal>}
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}

export default Header;
