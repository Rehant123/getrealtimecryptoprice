  import React, { useState, useEffect } from 'react';
  import {
    Table,
    Pagination,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    Container,
    TextField,
  } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import { CryptoState } from '../CryptoContext';
  import { ThemeProvider } from '@mui/material/styles';
  import { createTheme } from '@mui/material/styles';
  import { numberWithCommas } from './Banner/Carousel';
  import axios from 'axios';
  import { fetchList } from '../config/api.js';
  
  import "../App.css"
  const TableCall = ({ coins, search, page }) => {
    const b = useNavigate();
    const { symbol } = CryptoState();
   
    return (
      <TableContainer>
        <Table>
          <TableHead  style={{ backgroundColor: '#EEBC1D' }}>
            <TableRow>
              {['Coin', 'Price', '24h Change', 'Market Cap'].map((item) => {
                return (
                  <TableCell
                    key={item}
                    style={{
                      backgroundColor: 'gold',
                      fontFamily: 'montserrat',
                      color: 'black',
                      fontWeight: 'bold',
                      textAlign: item === 'Coin' ? '' : 'right',
                    }}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {coins.slice((page - 1) * 10, page * 10).map((item) => {
              const profit = item.price_change_percentage_24h > 0;

              return (
                <TableRow className = "jud" onClick={() => b(`/coins/${item.id}`)} key={item.name}>
                  <TableCell component="th" scope="row" style={{ display: 'flex', gap: 15 }}>
                    <img src={item.image} alt={item.name} height="50" style={{ marginBottom: 10 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ textTransform: 'uppercase', fontSize: 22 }}>{item.symbol}</span>
                      <span style={{ color: 'darkgrey' }}>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    {symbol} {numberWithCommas(item.current_price.toFixed(2))}
                  </TableCell>
                  <TableCell align="right" style={{ color: item.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                    {profit && '+'}
                    {item.price_change_percentage_24h}{'%'}
                  </TableCell>
                  <TableCell align="right">{symbol} {numberWithCommas(item.market_cap)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };



  const CoinTable = () => {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    const [search, setSearch] = useState('');
    const [coins, setCoins] = useState([]);
    const { currency } = CryptoState();
    const [page, setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const handlepage =(value)=>{
      setPage(value);
      console.log(value)
    } 
    const fetchCoins = async () => {
      setLoading(true);
      try {
        
        const { data } = await axios.get(fetchList(currency));
        console.log(data)
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchCoins();
    }, [currency]);

    const filteredItems = () => {
      return coins.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase())
      );
    };

    return (
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: 'center' }}>
          <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat', fontWeight: '500' }}>
            CryptoCurrency By Market Cap
          </Typography>
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            label="Search For a Crypto Currency.."
            size="large"
            style={{ marginBottom: 20, width: '100%' }}
            variant="outlined"
          />
          <TableCall coins={filteredItems()} search={search} page={page} />
          
          <Pagination
            count={Math.ceil(filteredItems().length / 10)}
            style={{ padding: 20, width: '100%', display: 'flex', justifyContent: 'center' }}
            onChange={(e,v)=>handlepage(v)}

          />
        </Container>
      </ThemeProvider>
    );
  };

  export default CoinTable;
