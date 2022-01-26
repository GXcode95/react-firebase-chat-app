import React, { useState, useEffect } from 'react'
import './style.scss'
import Img from 'assets/images/img.png'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { storage, db} from 'services/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from 'hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const [img, setImg] = useState("")
  const [user, setUser] = useState()
  const auth = useAuth()
  const navigate = useNavigate()


  useEffect(() => { //set user
    if(auth.user) {
      const getUserDoc = async () => {
        console.log("auth", auth.user)
        try {
          const response = await getDoc(doc(db, "users", auth.user.uid))
          setUser(response.data())
        } catch (error) {
          console.log(error)
        }
      }
      getUserDoc()
    }    
  },[auth])

  useEffect(() => {
    if(img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        )
        try {
          // Upload new Avatar
          const snap = await uploadBytes(imgRef, img) //upload un fichier sur le firebase storage
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath)) // get url from path in the firebase storage
          console.log("url", url)
          await updateDoc(doc(db, "users", auth.user.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath
          })
          setImg("")

          // Delete old Avatar
          if (user.avatarPath) await deleteObject(ref(storage, user.avatarPath))
          
          navigate("")
        } catch (error) {
          console.log(error)
        }
      }
      uploadImg()
    }
  }, [img]);


  return user ? (
    <section className="Profile">
      <div className="profile_container">

        <div className="img_container">
          <img src={user.avatar || Img} alt="avatar" />
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
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
        </div>

      </div>
    </section>
  ) : <div></div>
};

export default Profile;
