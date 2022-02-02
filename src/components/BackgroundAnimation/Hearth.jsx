import React from 'react'
import { Box, Grid} from '@mui/material'

import './hearth.scss'

const Hearth = () => {
  

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  return ( 
    <>
    <Grid container className="hearth-grid" rowSpacing={10}>
      {new Array(24).fill(0).map( entry => 
        
        <Grid item xs={3}>
          <Box className={`hearth-wrapper n${randomIntFromInterval(1,15)}`} position="relative" >
            <div className='hearth'></div>
          </Box>
        </Grid>
      )}
    </Grid>

    
      
    </>
  )
}

export default Hearth