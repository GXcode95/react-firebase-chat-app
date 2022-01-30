import React from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import './style.scss'

const AvatarForm = ({setAvatar}) => {

  return (
    <div  className="AvatarForm">
        <label htmlFor="photo">
          <CameraAltIcon />
        </label>
        <input 
          type="file" accept="image/*" 
          id="photo"
          onChange={ e => setAvatar(e.target.files[0])}
        />
    </div>
  )
}
    
export default AvatarForm