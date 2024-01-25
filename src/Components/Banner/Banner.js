// Home.js


// Banner.js
import React from 'react';
import { styled, Container} from '@mui/system';
import { Typography } from '@mui/material';
import "../../App.css"

//styling components
const banner = {
  backgroundImage:"url(./banner2.jpg)"
}
const bannerContent = {
  height:400,display:"flex",
  flexDirection:"column",paddingTop:25,
  justifyContent:"space-around"
}
const tagline = {
  display:"flex",
  height:"40%",
  flexDirection:"column",
  paddingTop:25,
  justifyContent:"space-around",
  textAlign:"center"

}

//main function
const Banner = () => {
  return (<div style = {banner}>
   <Container style = {bannerContent}>
    <div style = {tagline}>
      <Typography variant= "h2" style  ={{ fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginBottom:"center"
  
  }}>
         Crypto Hunter
        </Typography>
        <Typography variant = "subtitle1">
          Get all The information regarding Cryptocurrency
          </Typography>
    </div>
    </Container>
    </div>)

};

export default Banner;
