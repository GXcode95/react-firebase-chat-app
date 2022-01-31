import './style.scss'
import React from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button } from '@mui/material'

const MessageForm = ({ sendMessage, text, setText, setImage }) => {

  return (
    <form className='MessageForm' onSubmit={sendMessage}>
      <Box width="50px" display="flex" alignItems="center" justifyContent="center">
        <label htmlFor="img"><UploadIcon/></label>
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
        onChange={e => setText((e.target.value))}
      />
      <Button variant="outlined" type="submit" color="primary" className="send-btn">Send</Button>
    </form>
  )
}
    
export default MessageForm
