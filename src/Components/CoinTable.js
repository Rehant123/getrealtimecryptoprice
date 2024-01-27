import React, { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { ThemeProvider } from '@mui/material/styles';  // Correct import statement
import { Typography, Container,LinearProgress, TableContainer, TableHead } from '@mui/material';
import { createTheme } from '@mui/material/styles';  // Correct import statement
import {TextField,Table,TableCell,TableRow} from "@mui/material"


import "../App.css"
const CoinTable = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
const [Loading,setLoading] = useState(false)
const [search,setSearch] = useState("");

const [coins,setCoins] = useState([]);

const fetchCoins = ()=>{

  setCoins([
    {
      "id": "bitcoin",
      "symbol": "btc",
      "name": "Bitcoin",
      "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      "current_price": 41431,
      "market_cap": 811918115588,
      "price_change_percentage_24h": 4.32546
    },
    {
      "id": "ethereum",
      "symbol": "eth",
      "name": "Ethereum",
      "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      "current_price": 2259.41,
      "market_cap": 271663611201,
      "price_change_percentage_24h": 3.40906
    },
    {
      "id": "tether",
      "symbol": "usdt",
      "name": "Tether",
      "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
      "current_price": 1.001,
      "market_cap": 95666520205,
      "price_change_percentage_24h": 0.02606
    },
    {
      "id": "binancecoin",
      "symbol": "bnb",
      "name": "BNB",
      "image": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
      "current_price": 302.47,
      "market_cap": 46669690770,
      "price_change_percentage_24h": 3.53901
    },
    {
      "id": "solana",
      "symbol": "sol",
      "name": "Solana",
      "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756",
      "current_price": 92.45,
      "market_cap": 40074455794,
      "price_change_percentage_24h": 7.01119
    },
    {
      "id": "ripple",
      "symbol": "xrp",
      "name": "XRP",
      "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
      "current_price": 0.521575,
      "market_cap": 28352722435,
      "price_change_percentage_24h": 2.97753
    },
    {
      "id": "usd-coin",
      "symbol": "usdc",
      "name": "USDC",
      "image": "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
      "current_price": 1.001,
      "market_cap": 26047832916,
      "price_change_percentage_24h": 0.3111
    },
    {
      "id": "staked-ether",
      "symbol": "steth",
      "name": "Lido Staked Ether",
      "image": "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
      "current_price": 2257.61,
      "market_cap": 21135693739,
      "price_change_percentage_24h": 3.44814
    },
    {
      "id": "cardano",
      "symbol": "ada",
      "name": "Cardano",
      "image": "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090",
      "current_price": 0.485972,
      "market_cap": 17051564381,
      "price_change_percentage_24h": 4.32334
    },
    {
      "id": "polkadot",
      "symbol": "dot",
      "name": "Polkadot",
      "image": "https://assets.coingecko.com/coins/images/12171/large/aJGBjJFU_400x400.jpg?1597804776",
      "current_price": 23.45,
      "market_cap": 22156937897,
      "price_change_percentage_24h": 2.345
    }
  ])
  
}

useEffect(()=>{
fetchCoins()
},[currency])


const handleSearch = ()=>{
  return coins.filter((coin)=>coin.name.toLowerCase().includes(search)||coin.symbol.toLowerCase().includes(search))
}


  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: 'Montserrat', fontWeight: '500' }}
        >
          CryptoCurrency By Market Cap
        </Typography>
        <TextField onChange = {(e)=>setSearch(e.target.value)}label="Search For a Crypto Currency.."   sx = {{}} size="large"
        style = {{marginBottom:20,width:"100%"}}
        variant="outlined" />
     


      
<TableContainer>
      {Loading ?<LinearProgress style = {{backgroundColor:"gold"}}/>:
      <Table style = {{backgroundColor:"gold"}}>
        <TableHead>
        {/* <TableCell>Coin</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">24h Change</TableCell>
            <TableCell align="right">Market Cap&nbsp;(g)</TableCell>
             */}
             <TableRow>

        {
          ["Coin", "Price", "24H Change", "Market Cap"].map((item) => {
            return <TableCell key = {item} style={{ fontFamily: 'Montserrat',
            fontWeight: 'bold', color: "black", textAlign: item === "Coin" ? "" : "right" }}>
              {item}
              </TableCell>;
          })
          
        }     </TableRow> 
        </TableHead>
            
            
                  </Table> 
                    }
                   </TableContainer>
    
         </Container>

    </ThemeProvider>
  );
};

export default CoinTable;
