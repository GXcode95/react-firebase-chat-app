import React, { useState, useEffect } from 'react'
import './style.scss'
import Img from 'assets/images/img.png'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { storage, db} from 'services/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from 'hooks/useAuth'

const Profile = () => {
  const [img, setImg] = useState("")
  const [user, setUser] = useState()
  const auth = useAuth()

  useEffect(() => {
    if(auth.user) {
      const getUserDoc = async () => {
        console.log("auth", auth.user)
        try {
          const res = await getDoc(doc(db, "users", auth.user.uid))
          setUser(res.data())
        } catch (error) {
          console.log(error)
        }
      }
      getUserDoc()
    }
    if(img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        )
        try {
          const snap = await uploadBytes(imgRef, img) //upload un fichier sur le firebase storage
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath)) // get url from path in the firebase storage
          console.log("url", url)
          await updateDoc(doc(db, "users", auth.user.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath
          })
          setImg("")
        } catch (error) {
          console.log(error)
        }
      }
      uploadImg()
    }
  }, [img, auth]);


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
          <small>Join on: ...</small>
        </div>

      </div>
    </section>
  ) : null
};

export default Profile;
