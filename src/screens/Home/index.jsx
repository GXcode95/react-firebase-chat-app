import './style.scss'
import React, { useState, useEffect } from 'react'
import { addDoc, orderBy, query, Timestamp } from 'firebase/firestore'
import { collection, onSnapshot, where } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from 'services/firebase'
import { useAuth } from 'hooks/useAuth'
import User from 'components/User'
import MessageForm from 'components/MessageForm'
import Message from 'components/Message'

const Home = () => {
  const auth = useAuth()
  const [users ,setUsers] = useState([])
  const [penpal, setPenpal] = useState("")
  const [text, setText] = useState("")
  const [img, setImg] = useState("")
  const [messages, setMessages] = useState([])

  const selectUser = (user) => {
    setPenpal(user)
    const user1 = auth.user.uid
    const user2 = user.uid
    
    const chatId = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const messagesRef = collection(db, 'chats', chatId, "messages")
    const q = query(messagesRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, (querySnapshot) => {
      let tempMessages = []
      querySnapshot.forEach(doc => tempMessages.push(doc.data()))
      setMessages(tempMessages)
    })
    console.log("conversation", messages)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    const user1 = auth.user.uid
    const user2 = penpal.uid
    // prevent the both user in the conversation the have the same chatID in their document
    const chatId = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    
    try  {
      let url;
      if(img){ // upload the image to firebaseStorage add the url to message.media
        const imgRef = ref(storage, `images/${new Date().getTime} - ${img.name}`)
        const snap = await uploadBytes(imgRef, img)
        url = await getDownloadURL(ref(storage, snap.ref.fullPath))
      }


      await addDoc(collection(db, 'chats', chatId, 'messages' ), { // need to had a subCollection beacause...
        // ... it's impossible to addDoc directly on a document ...
        // ... limitation due to firebase firestore structure.
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || ""
      }) 
      setText("")
      setImg("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(auth.user) {
      const userRef = collection(db, 'users')
      const q = query(userRef,where('uid', '!=', auth.user.uid))
      
      const unsubscribe = onSnapshot(q, querySnapshot => {
        let tempUsers = []
        querySnapshot.forEach(doc => tempUsers.push(doc.data()))
        setUsers(tempUsers)
      })

      return () => unsubscribe() // cancel the the onSnapshot, prevent memory leaks
    }
  }, [auth]);
  
  return (
    <div className="Home">
      <div className="users_container">
        {users.map( user => <User key={user.uid} user={user} selectUser={selectUser}/> )}
      </div>
      <div className="messages_container">
        { penpal ? 
            <>
              <div className='messages_user'>
                <h3>{penpal.name}</h3>
              </div>
              <div className="messages">
                {console.log("msg", messages)}
                {messages.length && messages.map((message, i) => 
                  <Message key={i} message={message} />
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
      {console.log(users)}
    </div>
  )
}

export default Home;
