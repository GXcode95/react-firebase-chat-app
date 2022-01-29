import React from 'react';
import defaultAvatar from "assets/images/defaultAvatar.png"
import { Box } from '@mui/material'

const Avatar = ({size="50px", img, isOnline=true}) => {

  return (
    <Box
      width={size}
      height={size}
      overflow="hidden"
      borderRadius='50%'
      border="2px solid"
      borderColor={isOnline ? "success.main" : "error.main"}
      display="flex"
      justifyContent="center"
      alignItems="center"
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
