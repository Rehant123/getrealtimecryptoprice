import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography,Container, styled } from '@mui/material';
import { numberWithCommas } from '../Components/Banner/Carousel';
import CoinInfo from '../Components/CoinInfo';
import {LinearProgress} from '@mui/material';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';



const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  // Your data
  const {currency,symbol} = CryptoState();
  
const fetcheverycoin = async()=>{
  try{
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }
  
  catch(Error){
console.log(Error);
  }
 
}


  useEffect(() => {
    // Set coin to the entire data object
    fetcheverycoin();
  }, []);


  const ContainerStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  const Sidebar = styled('div')(({ theme }) => ({
    width: '30%',
    paddingLeft: "20px",
    display: 'flex',
    [theme.breakpoints.down('lg')]: {
      width: "100%"
    },
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: '10px',
    marginTop: 25,
    borderRight: '2px solid grey',
  }));
  const MarketData = styled('div')(({theme})=>({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
      
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "left",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }))

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <ContainerStyled>
      <Sidebar>
        <img src={coin?.image.large} alt='Coin Image' />
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "20", fontFamily: "Montserrat" }}>{coin?.name}</Typography>
        <Typography sx={{ marginBottom: "20", fontFamily: "Montserrat", marginTop: "20px" }}>{coin?.description["en"].split(".")[0]}</Typography>

        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>Rank : </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>Current Price: </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>{coin?.market_cap_rank}{coin?.current_price}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>Market Cap : </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
             {console.log("here it is")}
             {console.log(currency)}
             {console.log(coin)}
             {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
</Typography>  </span>
        </MarketData>
      </Sidebar>

      {/* righside */}

<CoinInfo>
  
</CoinInfo>
       
    </ContainerStyled>
  );
};

export default CoinPage;