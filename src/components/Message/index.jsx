import './style.scss'
import React, { useRef, useEffect } from 'react'
import Moment from 'react-moment'

const Message = ({message, userId}) => {
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth"})
  }, [message])

  return (
    <div className={`Message ${message.from === userId ? "own" : ""}`} ref={scrollRef}>
      <p className={message.from === userId ? "me" : "panpel"}>
        {message.media && <img src={message.media} alt={message.text} /> }
        {message.text}
        <br />
        {console.log("date:", message.createdAt)}
        <small><Moment fromNow>{message.createdAt.toDate()}</Moment></small>
      </p>
    </div>
  )
}
    
export default Message
