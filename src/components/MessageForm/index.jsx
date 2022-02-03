import './style.scss'
import React, { useContext } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button } from '@mui/material'
import { ThemeContext } from 'context/theme';

const ENTER_KEY = 13

const MessageForm = ({ sendMessage, text, setText, setImage }) => {
  const { theme } = useContext(ThemeContext)
  const textareaStyle = theme.bgAnimation?.includes('trix') ? {color: 'rgb(0,255,0)'} : {}
  const handleKeydown = (e) => {
    if (e.keyCode === ENTER_KEY && !e.shiftKey) sendMessage()
    else console.log(e)
  }

  return (
    <form className='MessageForm'>
      <Box width="50px" display="flex" alignItems="center" justifyContent="center">
        <label htmlFor="image" className='scale-hover'>
          <UploadIcon color="primary" />
        </label>
        <input 
          type="file"
          id="image"
          accept='image/*'
          style={{display: "none"}}
          onChange={e => setImage(e.target.files[0])}
        />
      </Box>
      <textarea className={theme.glass && 'glassmorph'}
        value={text}
        onKeyDown={handleKeydown}
        onChange={e => setText((e.target.value))}
        style={textareaStyle}
      />
      <Button variant="outlined" onClick={sendMessage} color="primary" className="send-btn">Send</Button>
    </form>
  )
}
    
export default MessageForm
