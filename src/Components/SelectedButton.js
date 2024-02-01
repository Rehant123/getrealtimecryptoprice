import React from 'react'

import {styled} from '@mui/material'
const SelectedButton = ({children,selected,onClick}) => {
    const Select = styled('div')(({ theme }) =>({
        border:"2px solid rgb(0, 255, 30)",
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        fontFamily:"Montserrat",
        cursor:"pointer",
        backgroundColor:selected?" rgb(0, 255, 30)":"",
        color:selected?"black":"",
        "&:hover":{
            backgroundColor:" rgb(0, 255, 30)",
            color:"black"
        },
        width:"22%",
        textAlign:"center"
    }))
  return (
    <Select onClick={onClick}>{children}</Select>
  )
}

export default SelectedButton