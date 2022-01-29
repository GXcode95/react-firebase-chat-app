import React, { useState, useEffect } from 'react'
import './style.scss'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { storage, db } from 'services/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from 'hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Avatar from 'components/Avatar'
import { Box } from '@mui/material'
import Loading from 'components/Loading'
import AvatarForm from 'components/AvatarForm'
const Profile = () => {
  const [avatar, setAvatar] = useState("")
  const [user, setUser] = useState()
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => { // set user
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

  useEffect(() => { // handle Avatar update
    if(avatar) {
      const uploadImage = async () => {
        const avatarRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${avatar.name}`
        )
        try {
          // Upload new Avatar
          const snap = await uploadBytes(avatarRef, avatar) //upload un fichier sur le firebase storage
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath)) // get url from path in the firebase storage
          await updateDoc(doc(db, "users", auth.user.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath
          })
          setAvatar("")

          // Delete old Avatar
          if (user.avatarPath) await deleteObject(ref(storage, user.avatarPath))
          
          navigate("")
        } catch (error) {
          console.log(error)
        }
      }
      uploadImage()
    }
  }, [avatar]);


  return user ? (
    <section className="Profile">
      <Box display='flex' alignItems="center">

        <Box position="relative" margin="20px" >
          <Avatar img={user.avatar} size="100px" />
          <AvatarForm setAvatar={setAvatar} />
        </Box>
        
        <Box flex="1" sx={{textAlign: "center"}}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
        </Box>

      </Box>
    </section>
  ) : <Loading />
};

export default Profile;
