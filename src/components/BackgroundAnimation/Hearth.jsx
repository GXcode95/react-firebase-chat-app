import React from 'react'
import { Box } from '@mui/material'

import './hearth.scss'

const Hearth = () => {
  
  
  return ( 
    <>
    <Box className="hearth-wrapper" position="absolute" sx={{top: "300px", right:0}}>
      <div className="hearth"></div>
    </Box>

    <Box className="hearth-wrapper" position="absolute" sx={{top: "300px", left: "70px"}}>
      <div className="hearth"></div>
    </Box>

    
      
    </>
  )
}

export default Hearth