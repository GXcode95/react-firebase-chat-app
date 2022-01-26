import React, { useState, useEffect } from 'react'
import './style.scss'
import Img from 'assets/images/img.png'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { storage, db} from 'services/firebase'
import { ref, getDownloadUrl, uploadBytes } from 'firebase/storage'
import { getDocs, doc, getDoc } from 'firebase/firestore'
import useAuth from 'hooks/useAuth'

const Profile = () => {
  const [img, setImg] = useState()

  useEffect(() => {
    if(img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        )
        const snap = await uploadBytes(imgRef, img) //upload un fichier sur le firebase storage
        console.log(snap.ref.fullPath)
      }
      uploadImg()
    }
  }, [img]);
  //?Your bucket has not been set up properly for Firebase Storage. Please visit 'https://console.firebase.google.com/project/react-chat-b7430/storage/files' to automatically repair this issue and then retry. If the issue lasts longer than five minutes, you may have insufficient permissions to repair the project. You can check your permissions by visiting 'https://console.firebase.google.com/iam-admin/iam/project?project=react-chat-b7430
  return (
    <section className="Profile">
      <div className="profile_container">

        <div className="img_container">
          <img src={Img} alt="avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo" >
                <CameraAltIcon />
              </label>
              <input 
                type="file" accept="image/*" 
                id="photo"
                onChange={ e => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        
        <div className="text_container">
          <h3>User name</h3>
          <p>User email</p>
          <hr />
          <small>Join on: ...</small>
        </div>

      </div>
    </section>
  )
};

export default Profile;
