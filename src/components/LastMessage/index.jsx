import React from 'react'

const LastMessage = ({text, isAuthor}) => {
  const sx = {
    p:{
    fontSize: "14px",
    marginTop: "5px"
    },
    span:{
    fontWeight: 600,
    marginRight: "5px"
    }
  }

  return (
    <p className="truncate" style={sx.p}>
      <span style={sx.span}>
        {isAuthor && "Me:"}
      </span>
    {text}
  </p>     
  )
}
    
export default LastMessage
