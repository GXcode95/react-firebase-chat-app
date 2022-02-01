import React, { useState, useEffect } from 'react'
import './style.scss'
import { storage, db } from 'services/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from 'hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Avatar from 'components/Avatar'
import { Box, Container, Typography } from '@mui/material'
import Loading from 'components/Loading'
import AvatarForm from 'components/AvatarForm'
import ThemeSelector from 'components/ThemeSelector'

const Profile = () => {
  const [avatar, setAvatar] = useState("")
  const [user, setUser] = useState()
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => { // set user
    if(auth.user) {
      const getUserDoc = async () => {
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
    <Container className="Profile">
      <Box display='flex' alignItems="center">

        <Box className="avatar-container" >
          <Avatar img={user.avatar} size="100px" />
          <AvatarForm setAvatar={setAvatar} />
        </Box>
        
        <Box flex="1" textAlign="center" pt={4}>
          <Typography variant="h3" pb={4}>{user.name}</Typography>
          <Typography variant="h5" component={"p"} pb={4}>{user.email}</Typography>
        </Box>

      </Box>
      <hr />
      <Box className="f-center" flexDirection="column" gap={2} p={5}>
        <Typography variant="h6">Choose a theme</Typography>
        <ThemeSelector />
      </Box>
    </Container>
  ) : <Loading />
};

export default Profile;