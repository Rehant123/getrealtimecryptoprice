import * as React from 'react';

import Drawer from '@mui/material/Drawer';
import { Avatar } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import {Container} from '@mui/material';
import styled from '@emotion/styled';
import {Button} from '@mui/material';
import { signOut } from 'firebase/auth';
import {auth} from "../firebase"
import { toast } from 'react-toastify';
import { AiFillDelete } from 'react-icons/ai';
import { doc } from 'firebase/firestore';
import { db } from '../firebase';
import { setDoc } from 'firebase/firestore';
import { numberWithCommas } from './Banner/Carousel';
export default function UserSidebar({id,picture}) {
    
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const cryptostate = CryptoState();
  const {user,watchlist,coins,symbol} = cryptostate;

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

//   function

const logout =()=>{
//signout from firebase
        signOut(auth);
        toast.success("Logout successfull");
}



  //styling

    const Profile = styled("div")({
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    })
    const Container = styled("div")({
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "montserrat",
        
    })

const WatchList = styled("div")({
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",

})
const Coinstyle = styled("div")({
 
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",

})
const RemoveFromWatchListWithID = async (coin) => {
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
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            {console.log(user)}
          <Avatar
          src = {user.photoURL?user.photoURL:"profile.png"}
          onClick={toggleDrawer(anchor, true)}
          sx = {{
            height:38,
            width:38,
            cursor:"pointer",
            marginLeft:2
          }}
          alt= {user.email||user.displayName}
          
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
       <Container>
    <Profile>

        <Avatar
          src = {user.photoURL?user.photoURL:"profile.png"}
          onClick={toggleDrawer(anchor, true)}
          sx = {{
            width: 200,
            height: 200,
            cursor: "pointer",
            backgroundColor: "pink",
            objectFit: "contain",
          }}
          alt= {user.email||user.displyName}
          />
          <span style={{
              width: "100%",
              fontSize:20,
              textAlign: "center",
              fontWeight: "bolder",
              wordWrap: "break-word", // Corrected property name
            }}>
            {user.displayName||user.email}
            </span>
          
<WatchList>
   <span style = {{fontSize:15,textShadow:" 0 0 5px black"}}>WatchList</span>
   {console.log(coins)}
 {
  coins.map((items)=>{
    if(watchlist.includes(items.id)){
      return (
        <Coinstyle>
          <span>{items.name}</span>
          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(items.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => RemoveFromWatchListWithID(items)}
                            />
                              </span>
                        

          </Coinstyle>
      )
    }
  })
 }
    </WatchList>
    
        </Profile>
        
        <Button onClick = {logout} sx = {{ height: "5%",
    width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20}}variant="contained">
Logout
            </Button>
        </Container>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}