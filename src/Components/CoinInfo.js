import React, { useEffect } from 'react';
import { useState } from 'react';
import { HistoricalChart } from '../config/api';
import { useParams } from 'react-router-dom';
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { styled, Container } from '@mui/material';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import { debounce } from 'lodash';

 // Adjust the delay as needed


import { chartDays } from '../config/data';
import SelectedButton from './SelectedButton';
Chart.register(...registerables);
const CoinInfo = () => {
    const [historicaldata, setHistoricalData] = useState([]);
    const [days, setDays] = useState(1);

    const { currency } = CryptoState();
    console.log(currency);
    const { id } = useParams();

    const fetchHistoricData = async () => {
        try {
            const { data } = await axios.get(HistoricalChart(id, days, currency));
            setHistoricalData(data.prices);
            console.log(data.prices)
        } catch (error) {
            console.error("Error fetching historical data:", error);
        }
    };
    const debouncedFetchHistoricData = debounce(fetchHistoricData, 500);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark",
        }
    });

    useEffect(() => {
      debouncedFetchHistoricData();
    }, [currency,days]);

    //button styling
    const ButtonControl =styled('div')((({theme})=>(
        {
justifyContent:'space-around',
width:"100%",
marginTop:20,
display:'flex'
        }
    )))

    const ContainerStyled = styled('div')(({ theme }) =>({
        width: "75%",
        display:"flex",
      height:'auto',
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    padding:40,
        [theme.breakpoints.down("md")]:{
            width:"100%",
            marginTop:0,
            padding:20,
            padding:0,
        },
    }));

    return (
        <ThemeProvider theme={darkTheme}>
            <ContainerStyled>
               {!historicaldata?<CircularProgress
                    style = {{color:"rgb(0, 255, 30)"}}
                    size = {250}
                    thickness={1}
                />:<>
                
                <Line
              data={{
                labels: historicaldata.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicaldata.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "rgb(0, 255, 30)",
                  }],
              }}
              options={{
                elements:{
                    point:{
                        radius:1,
                    }
                }
              }}
              >
                    </Line>
                    <ButtonControl>
{chartDays.map(x=>{
    return <SelectedButton key = {x.value} onClick={()=>setDays(x.value)} selected={x.value === days }>{x.label}</SelectedButton>
})}
</ButtonControl>
                   
                </>}
            </ContainerStyled>
        </ThemeProvider>
    );
};

export default CoinInfo;
