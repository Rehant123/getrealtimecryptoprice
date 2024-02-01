import React, { useEffect } from 'react';
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




const Carousel = () => {
  const {symbol} = CryptoState();
//   const {currency}= CryptoState();
// const getcoins = async()=>{
// try{
//     const {trending} = await axios.get(fetchTrendingCoins(currency));
//     console.log(data);
// }
// catch(error)
// {
//     console.log(error)
// }


const trending = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400', current_price: 3313108, price_change_percentage_24h: 5.2 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628', current_price: 183778, price_change_percentage_24h: -3.1 },
  { id: 'tether', symbol: 'usdt', name: 'Tether', image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661', current_price: 83.19, price_change_percentage_24h: 0.02 },
  { id: 'binancecoin', symbol: 'bnb', name: 'BNB', image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970', current_price: 24225, price_change_percentage_24h: -1.8 },
  { id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756', current_price: 7205.87, price_change_percentage_24h: 2.5 },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442', current_price: 42.55, price_change_percentage_24h: -0.5 },
  { id: 'usd-coin', symbol: 'usdc', name: 'USDC', image: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694', current_price: 83.22, price_change_percentage_24h: 0.1 },
  { id: 'staked-ether', symbol: 'steth', name: 'Lido Staked Ether', image: 'https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206', current_price: 183780, price_change_percentage_24h: 1.3 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', current_price: 38.8, price_change_percentage_24h: -2.7 },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369', current_price: 2515.99, price_change_percentage_24h: 4.8 },
];

// Example: Accessing price_change_percentage_24h for Bitcoin


console.log(trending)



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

  //items to put in alice carousel
  const items = trending.map((coin)=>{
    let profit = coin.price_change_percentage_24h>=0;

    console.log(profit)
    return (
      <Link style = {carouselItem} to = {`/coins/${coin.id}`} key = {coin.id}>
        <>
        <img src = {coin?.image} alt = {coin.name} height = "80px" width="80px" style = {{marginBottom:10}}></img>
        </>
        <span style = {{marginBottom:"100"}}>{(coin?.symbol)}
        &nbsp;
        <span style = {{
          color:profit>0?"rgb(14,203,129)":"red",
          fontWeight:400,
          
          
        }}>
          {profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span  style = {{fontSize:22,fontWeight:500}}>
         {symbol} {numberWithCommas(coin.current_price)}
          </span>
      </Link>

    )
  })


  return (
    <div style = {carouselStyle}>
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
