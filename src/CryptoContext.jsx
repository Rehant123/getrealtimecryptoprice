// CryptoContext.js

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { fetchList } from './config/api';
import {auth,db} from "./firebase.js";
import { onAuthStateChanged } from 'firebase/auth';

const Crypto = createContext();

const CryptoContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [symbol, setSymbol] = useState('₹');
  const [coins, setCoins] = useState([]);
  const [loading,setLoading] = useState(false);
  const[user,setUser] = useState();
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
    if (currency === 'INR') {
      setSymbol('₹');
    } else if (currency === 'USD') {
      setSymbol('$');
    }
  }, [currency]);

useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(user){
      setUser(user);
    }else{
      setUser(null);
    }
  })
},[])
 
const value = {
    currency,
    setCurrency,
    coins,
    loading,
    setLoading,
    setCoins,
    fetchCoins,
    user
  };
  return (
    <Crypto.Provider value={value}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContextProvider;
//

export const CryptoState = () => {
  return useContext(Crypto);

};
