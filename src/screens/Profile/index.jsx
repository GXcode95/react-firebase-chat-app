import React, { useState, useEffect } from 'react'
import './style.scss'
import defaultAvatar from "assets/images/defaultAvatar.png"
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { storage, db} from 'services/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from 'hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const [image, setImage] = useState("")
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
    if(image) {
      const uploadImage = async () => {
        const imageRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${image.name}`
        )
        try {
          // Upload new Avatar
          const snap = await uploadBytes(imageRef, image) //upload un fichier sur le firebase storage
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath)) // get url from path in the firebase storage
          await updateDoc(doc(db, "users", auth.user.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath
          })
          setImage("")

          // Delete old Avatar
          if (user.avatarPath) await deleteObject(ref(storage, user.avatarPath))
          
          navigate("")
        } catch (error) {
          console.log(error)
        }
      }
      uploadImage()
    }
  }, [image]);


  return user ? (
    <section className="Profile">
      <div className="profile_container">

        <div className="img_container">
          <img src={user.avatar || defaultAvatar} alt="avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo" >
                <CameraAltIcon />
              </label>
              <input 
                type="file" accept="image/*" 
                id="photo"
                onChange={ e => setImage(e.target.files[0])}
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
