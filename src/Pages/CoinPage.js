// Importing necessary modules and components
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, styled } from '@mui/material';
import { numberWithCommas } from '../Components/Banner/Carousel';
import CoinInfo from '../Components/CoinInfo';
import { LinearProgress } from '@mui/material';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { toast } from 'react-toastify';
import "../Components/UserSidebar.css"
import { db } from '../firebase';
import { doc } from 'firebase/firestore';
import { setDoc ,getDoc} from 'firebase/firestore';

// Main component definition
const CoinPage = () => {
  // State declarations
  const [inWatchList, setInWatchList] = useState(false); 
  const { id } = useParams();
  const [coin, setCoin] = useState("");
  
  // Extracting data from CryptoState context
  const cryptostate = CryptoState();
  const { currency, symbol, setCurrency, user, watchlist, setWatchList } = cryptostate;

  // Function to fetch data of the selected coin
  const fetchEveryCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Effect hook to fetch data of the selected coin on component mount
  useEffect(() => {
    fetchEveryCoin();
  }, []);

  // Styling for container component
  const ContainerStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  // Styling for sidebar component
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

  // Styling for market data component
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
  }));

  // Effect hook to check if the selected coin is in the watchlist
  useEffect(() => {
    if (coin && coin.id && watchlist) {
      setInWatchList(watchlist.includes(coin.id));
    }
  }, [coin, watchlist]);
 


  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  const inWatchlist = watchlist.includes(coin?.id);

  const AddToWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );
      toast.success("coin added into watchlist")
    
    } catch (error) {
    console.log(error)
    }
  }
 const RemoveFromWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {coins:watchlist.filter(x=>x!=coin?.id)}
      );
      toast.success("coin removed from watchlist")

    
    } catch (error) {
    console.log(error)
    }
  }
  const RemoveFromWatchListWithID = async (cooin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {coins:watchlist.filter(x=>x!=coin?.id)}
      );
      toast.success("coin removed from watchlist")

    
    } catch (error) {
    console.log(error)
    }
  }
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
            
             {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              
              {console.log(id)}


</Typography>  </span>
{user &&
 <button class="glow-on-hover"
 type="button" onClick={!inWatchList?AddToWatchList:RemoveFromWatchList}>{!inWatchList?"ADD TO WATCHLIST":"REMOVE FROM WATCHLIST"}
</button>
             }
        </MarketData>
      </Sidebar>

      {/* righside */}

<CoinInfo>
  
</CoinInfo>
       
    </ContainerStyled>
  );
};

export default CoinPage;