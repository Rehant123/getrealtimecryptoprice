import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab } from '@mui/material';
import { Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import { styled } from '@mui/material';
import "../../App.css"
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const style = {
  width: 400,
  bgcolor: 'background.paper',
  color: "white",
  borderRadius: 10,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{
          backgroundColor: "#EEBC1D",
          marginLeft: "20px",
          width: "85",
          height: "40"
        }}
      >
        Login
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <AppBar position="static" style={{ backgroundColor: "transparent", color: "white" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  style={{ borderRadius: 10 }}
                  textColor="primary"
                  indicatorColor="primary"
                  aria-label="secondary tabs example"
                >
                  <Tab label="Login" />
                  <Tab label="Sign Up" />
                </Tabs>
              </AppBar>
            </div>
            {value == 0 && <Login handleClose={handleClose}></Login>}
            {value == 1 && <Signup handleClose={handleClose} />}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
