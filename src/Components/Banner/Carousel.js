import React, { useEffect } from 'react';
import { fetchTrendingCoins } from '../../config/api';
import axios from "axios"
import { CryptoState } from '../../CryptoContext';


const Carousel = () => {

  const {currency}= CryptoState();
const getcoins = async()=>{
try{
    const {data} = await axios.get(fetchTrendingCoins(currency));
    console.log(data);
}
catch(error)
{
    console.log(error)
}

}


useEffect(()=>{
  getcoins();
},[])
  return (
    <div>
        Carousel
    </div>
  );
}

export default Carousel;
