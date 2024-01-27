import React from 'react';
import { makeStyles, Container } from '@mui/material';
import Banner from '../Components/Banner/Banner';
import Carousel from '../Components/Banner/Carousel';
import CoinTable from '../Components/CoinTable';
export default function Home(){
  return (
    <div style = {{height:"485px"}}> 
      <Banner />
      <CoinTable/>
    </div>
  );
}
