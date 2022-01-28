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

const Home = () => {
  const auth = useAuth()
  const [contacts ,setContacts] = useState([])
  const [penpal, setPenpal] = useState("")
  const [text, setText] = useState("")
  const [img, setImg] = useState("")
  const [messages, setMessages] = useState([])

  const selectPenpal = async (contact) => {
    setPenpal(contact)
    
    const chatId = generateChatID(auth.user.uid, contact.uid)
    const messagesRef = collection(db, 'chats', chatId, "messages")
    const q = query(messagesRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, (querySnapshot) => {
      let tempMessages = []
      querySnapshot.forEach(doc => tempMessages.push(doc.data()))
      setMessages(tempMessages)
    })

    const docSnap = await getDoc(doc(db, 'lastMessage', chatId))
    if(docSnap.data().from !== auth.user.uid) {
      await updateDoc(doc(db, "lastMessage", chatId), {unread: false})
    }

  }

  const generateChatID = (user1, user2) => {
    if (!user1, !user2) return null
    // this way we have the same chat uid for both user
    return user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
  }

  const sendMessage = async (e) => {
    e.preventDefault()

    const chatId = generateChatID(auth.user.uid, penpal.uid)
    
    try  {
      // upload the image to firebaseStorage add the url to message.media
      let url;
      if(img){
        const imgRef = ref(storage, `images/${new Date().getTime} - ${img.name}`)
        const snap = await uploadBytes(imgRef, img)
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
      setImg("")
    } catch (error) {
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
    <div className="Home">
      <div className="penpal_container">
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
      </div>
      <div className="messages_container">
        { penpal ? 
            <>
              <div className='messages_user'>
                <h3>{penpal.name}</h3>
              </div>
              <div className="messages">
                {messages.length && messages.map((message, i) => 
                  <Message key={i} message={message} userId={auth.user.uid} />
                )}
              </div>
              <MessageForm 
                text={text}
                setImg={setImg}
                setText={setText} 
                sendMessage={sendMessage} 
              />
            </>
          :
          <h3 className="no_conv">Click on  a user to start a conversation</h3>
        }
      </div>
    </div>
  )
}

export default Home;
