// CombinedTable.js
import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Typography, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { numberWithCommas } from './Banner/Carousel';

// Import the CSS file
import './TableStyles.css';

const TableCall = ({ coins }) => {
  const t = ' ';
  const search = t.trim();
  const [page,setpage] = useState(1); 
  const { currency, symbol } = CryptoState();

  const filteredItems = coins.filter((item) => {
    return item.name.toLowerCase().includes(search.toLocaleLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <TableContainer>
      <Table>
        <TableHead style={{ backgroundColor: '#EEBC1D' }}>
          <TableRow>
            {/* ... (previous code) */}
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredItems.map((item) => {
            const profit = item.price_change_percentage_24h > 0;

            return (
              <TableRow className="table-row" onClick={() => b(`/coins/${item.id}`)} key={item.name}>
                {/* ... (your existing code for rendering Coin information) */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CombinedTable = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState([]);
  const { currency } = CryptoState();

  const fetchCoins = () => {
    // ... (your existing code for fetching coins)
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat', fontWeight: '500' }}>
          CryptoCurrency By Market Cap
        </Typography>
        <TextField onChange={(e) => setSearch(e.target.value)} label="Search For a Crypto Currency.." size="large" style={{ marginBottom: 20, width: '100%' }} variant="outlined" />
        <TableCall coins={coins}></TableCall>
      </Container>
    </ThemeProvider>
  );
};

export default CombinedTable;

