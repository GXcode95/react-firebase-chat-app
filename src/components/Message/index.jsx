import './style.scss'
import React, { useRef, useEffect } from 'react'
import Moment from 'react-moment'
import { Box, Typography} from '@mui/material'

const Message = ({message, userId}) => {
  const scrollRef = useRef()
  const userIsOwner = message.from === userId
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth"})
  }, [message])

  return (
    <Box className={`Message ${ userIsOwner ? "own" : ""}`} ref={scrollRef} >
      <Typography component="p" sx={{bgcolor: userIsOwner ? "primary.main" : "secondary.main"}}>
        {message.media && <img src={message.media} alt={message.text} /> }
        {message.text}
        <br />
        <small><Moment fromNow>{message.createdAt.toDate()}</Moment></small>
      </Typography>
    </Box>
  )
}
    
export default Message
