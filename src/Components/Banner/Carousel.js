import React, { useEffect, useState } from 'react';
import { fetchTrendingCoins } from '../../config/api';
import axios from "axios"
import { CryptoState } from '../../CryptoContext';
import "../../App.css"

import { Link } from 'react-router-dom';
//making a carousel using alicecarousal

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { display } from '@mui/system';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//carousel style

const carouselStyle ={
  height:"50%",
  display:"flex",
  alignItems:"center",
  margin:"20px",
  color:"white"
}

const carouselItem = {
  display:"flex",
  flexDirection:"column",
  color:"white",
  fontFamily:"montserrat",
  alignItems:"center",textTransform:" uppercase"
}

//responsive for pixel
const responsive = {
  0:{
    items:2
  },
 512:
  {
    items:4
  }
}

const Carousel = () => {
  const { symbol, currency } = CryptoState();
  const [coins, setCoins] = useState();

  const getcoins  = async () => {
    try {
      const { data } = await axios.get(fetchTrendingCoins(currency));
      setCoins(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getcoins();
  }, [currency])

  //items to put in alice carousel
  const items = coins?.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link style={carouselItem} to={`/coins/${coin.id}`} key={coin.id}>
        <>
          <img src={coin?.image} alt={coin.name} height="80px" width="80px" style={{ marginBottom: 10 }}></img>
        </>
        <span style={{ marginBottom: "100" }}>{(coin?.symbol)}
          &nbsp;
          <span style={{
            color: profit > 0 ? "rgb(14,203,129)" : "red",
            fontWeight: 400,
          }}>
            {profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin.current_price)}
        </span>
      </Link>
    )
  })

  return (
    <div style={carouselStyle}>
      <AliceCarousel
        autoPlay={true}
        autoPlayInterval={2000}
        animationDuration={1000}
        infinite
        mouseTracking
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        items={items}
      />
    </div>
  );
}

export default Carousel;
