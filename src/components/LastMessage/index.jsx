import React from 'react'
import './style.scss'
const LastMessage = ({text, isAuthor}) => {

  return (
    <p className="LastMesssage truncate">
      <span>
        {isAuthor && "Me:"}
      </span>
    {text}
  </p>     
  )
}
    
export default LastMessage
