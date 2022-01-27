import './style.scss'
import React from 'react'
import Moment from 'react-moment'

const Message = ({message}) => {

  return (
    <div className='Message'>
      <p>
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
