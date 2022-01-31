import './style.scss'
import React from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, IconButton } from '@mui/material'

const ENTER_KEY = 13

const MessageForm = ({ sendMessage, text, setText, setImage }) => {

  const handleKeydown = (e) => {
    if (e.keyCode === ENTER_KEY && !e.shiftKey) sendMessage()
    else console.log(e)
  }

  return (
    <form className='MessageForm'>
      <Box width="50px" display="flex" alignItems="center" justifyContent="center">
        <label htmlFor="image"><IconButton><UploadIcon color="primary" /></IconButton></label>
        <input 
          type="file"
          id="image"
          accept='image/*'
          style={{display: "none"}}
          onChange={e => setImage(e.target.files[0])}
        />
      </Box>
      <textarea
        placeholder="Enter your message ..."
        value={text}
        onKeyDown={handleKeydown}
        onChange={e => setText((e.target.value))}
      />
      <Button variant="outlined" onClick={sendMessage} color="primary" className="send-btn">Send</Button>
    </form>
  )
}
    
export default MessageForm
