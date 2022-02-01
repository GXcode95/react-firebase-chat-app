import './style.scss'
import React, { useRef, useEffect, useContext } from 'react'
import Moment from 'react-moment'
import { Box, Typography} from '@mui/material'
import { ThemeContext } from 'context/theme'

const Message = ({message, userId}) => {
  const scrollRef = useRef()
  const userIsOwner = message.from === userId
  const { theme } = useContext(ThemeContext)
  
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth"})
  }, [message])

  return (
    <Box className={`Message ${ userIsOwner ? "own" : ""}`} ref={scrollRef} >
      <Typography className={theme.glass && "glassmorph"} component="p" sx={{bgcolor: userIsOwner ? theme.palette.messages.main : theme.palette.messages.penpal}}>
        {message.media && <img src={message.media} alt={message.text} /> }
        {message.text}
        <br />  
        <small><Moment fromNow>{message.createdAt.toDate()}</Moment></small>
      </Typography>
      {console.log()}
    </Box>
  )
}
    
export default Message
