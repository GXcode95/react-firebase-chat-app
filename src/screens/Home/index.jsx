import './style.scss'
import React, { useState, useEffect } from 'react'
import { addDoc, orderBy, query, setDoc, doc, Timestamp, getDoc, updateDoc } from 'firebase/firestore'
import { collection, onSnapshot, where } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from 'services/firebase'
import { useAuth } from 'hooks/useAuth'
import Contact from 'components/Contact'
import MessageForm from 'components/MessageForm'
import Message from 'components/Message'
import {Box, Typography} from '@mui/material'

const Home = () => {
  const auth = useAuth()
  const [contacts ,setContacts] = useState([])
  const [penpal, setPenpal] = useState("")
  const [text, setText] = useState()
  const [image, setImage] = useState()
  const [messages, setMessages] = useState()

  const selectPenpal = async (contact) => {
    if(!contact) return
    setPenpal(contact)
    
    const chatId = generateChatID(auth.user.uid, contact.uid)
    const messagesRef = collection(db, 'chats', chatId, "messages")
    const q = query(messagesRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, (querySnapshot) => {
      let tempMessages = []
      querySnapshot.forEach(doc => tempMessages.push(doc.data()))
      setMessages(tempMessages)
    })

    try {
      const docSnap = await getDoc(doc(db, 'lastMessage', chatId))
      if(docSnap.data() && docSnap.data().from !== auth.user.uid) {
        await updateDoc(doc(db, "lastMessage", chatId), {unread: false})
      }
    } catch (error) {
      console.log(error)
    }
  }

  const generateChatID = (user1, user2) => {
    if (!user1, !user2) return null
    // this way we have the same chat uid for both user
    return user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
  }

  const sendMessage = async () => {
    if( !text && !image) return
    const chatId = generateChatID(auth.user.uid, penpal.uid)
    
    try  {
      // upload the image to firebaseStorage add the url to message.media
      let url;
      if(image){
        const imageRef = ref(storage, `images/${new Date().getTime} - ${image.name}`)
        const snap = await uploadBytes(imageRef, image)
        url = await getDownloadURL(ref(storage, snap.ref.fullPath))
      }

      //upload the message in the messages doc
      await addDoc(collection(db, 'chats', chatId, 'messages' ), { // need to had a subCollection because...
        // ... it's impossible to addDoc directly on a document ...
        // ... limitation due to firebase firestore structure.
        text,
        from: auth.user.uid,
        to: penpal.uid,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
      }) 

      // create a last message doc (if it already exist, it just replace it )
      await setDoc(doc(db, 'lastMessage', chatId), {
        text,
        from: auth.user.uid,
        to: penpal.uid,
        media: url || "",
        unread: true,
      })

      // Reset state after message send successfully
      setText("")
      setImage("")
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() => {
    if(auth.user) {
      const userRef = collection(db, 'users')
      const q = query(userRef,where('uid', '!=', auth.user.uid))
      
      const unsubscribe = onSnapshot(q, querySnapshot => {
        let tempList = []
        querySnapshot.forEach(doc => tempList.push(doc.data()))
        setContacts(tempList)
      })

      return () => unsubscribe() // cancel the the onSnapshot, prevent memory leaks
    }
  }, [auth]);
  
  return (
    <Box className="Home">
      <Box className="i-scroll contact-list-container"
        flex={{xs: "0.15", md:"0.25"}} 
        borderRight="2px solid"
        borderColor="primary.main"
      >
        {contacts.map( contact =>
           <Contact 
            key={contact.uid}
            chatId={generateChatID(auth.user.uid, contact.uid)}
            contact={contact} 
            penpal={penpal}
            selectPenpal={selectPenpal} 
            user={auth.user}
          /> 
        )}
      </Box>
      <Box className="messages-container" maxWidth={{xs: "85vw", md: "75vw"}}>
        {penpal ? 
          <>
            <Box className="i-scroll messages" borderBottom="1px solid" borderColor="primary.main" >
              {messages && messages.map((message, i) => 
                <Message key={i} message={message} userId={auth.user.uid} />
              )}
            </Box>
            
            <Box className="message-form-container">
              <MessageForm 
                text={text}
                setImage={setImage}
                setText={setText} 
                sendMessage={sendMessage} 
              />
            </Box>
          </>
          :
          <Typography variant="h5" component="h3" align="center">
            Click on  a user to start a conversation
          </Typography>
        }
      </Box>
    </Box>
  )
}

export default Home;
