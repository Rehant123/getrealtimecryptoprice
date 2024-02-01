import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography,Container, styled } from '@mui/material';
import { numberWithCommas } from '../Components/Banner/Carousel';
import CoinInfo from '../Components/CoinInfo';
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  // Your data
  const data = {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "web_slug": "bitcoin",
    "asset_platform_id": null,
    "current_price":3800000,
    "platforms": {
      "": ""
    },
    "image": {
      "thumb": "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1696501400",
      "small": "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1696501400",
      "large": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
    },
    "description": {"en":"Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. "},
    "market_cap_rank":1,
    "market_data":{
      "market_cap":
      {
        "usd":25565454,
        "inr":12233554455,
      }
    }
    

  };

  const [currency,setCurrency] = useState("");


  useEffect(() => {
    // Set coin to the entire data object
    setCoin(data);
  }, []);

  console.log(coin);

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


  return (
    <ContainerStyled>
      <Sidebar>
        <img src={coin?.image.large} alt='Coin Image' />
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "20", fontFamily: "Montserrat" }}>{coin?.name}</Typography>
        <Typography sx={{ marginBottom: "20", fontFamily: "Montserrat", marginTop: "20px" }}>{data.description["en"].split(".")[0]}</Typography>

        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>Rank : </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>Current Price: </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>{coin?.market_cap_rank}{data.current_price}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>Market Cap : </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>{}</Typography>
          </span>
        </MarketData>
      </Sidebar>

      {/* righside */}

<CoinInfo>
  
</CoinInfo>
       
    </ContainerStyled>
  );
};

export default CoinPage;