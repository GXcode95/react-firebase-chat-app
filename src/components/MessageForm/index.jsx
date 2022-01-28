import './style.scss'
import React from 'react'
import UploadIcon from '@mui/icons-material/Upload';

const MessageForm = ({ sendMessage, text, setText, setImage }) => {

  return (
    <form className='MessageForm' onSubmit={sendMessage}>
      <label htmlFor="img"><UploadIcon/></label>
      <input 
        type="file"
        id="image"
        accept='image/*'
        style={{display: "none"}}
        onChange={e => setImage(e.target.files[0])}
      />
      <div>
        <input
          type="text"
          placeholder="Enter your message ..."
          value={text}
          onChange={e => setText((e.target.value))}
        />
      </div>
      <div>
        <button className="btn">Send</button>
      </div>
    </form>
  )
}
    
export default MessageForm
