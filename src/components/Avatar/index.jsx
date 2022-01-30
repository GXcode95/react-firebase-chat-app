import React from 'react';
import defaultAvatar from "assets/images/defaultAvatar.png"
import { Box } from '@mui/material'
import './style.scss'

const Avatar = ({size="50px", img, isOnline=true}) => {

  return (
    <Box className="Avatar"
      width={size}
      height={size}
      borderColor={isOnline ? "success.main" : "error.main"}
    >
      <img 
        src={img || defaultAvatar} 
        alt="avatar" 
        width={size}
        height={size}
      />
    </Box>
  )
}

export default Avatar;
