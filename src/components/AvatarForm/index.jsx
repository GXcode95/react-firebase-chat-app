import React from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

const AvatarForm = ({setAvatar}) => {
  const style = {
    transition:"0.5s ease",
    opacity:0,
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%, -50%)",
    textAlign:"center",
  }

  return (
    <div style={style}>
      <div>
        <label htmlFor="photo" >
          <CameraAltIcon />
        </label>
        <input 
          type="file" accept="image/*" 
          id="photo"
          onChange={ e => setAvatar(e.target.files[0])}
          style={{display: "none"}}
        />
      </div>
    </div>
  )
}
    
export default AvatarForm
