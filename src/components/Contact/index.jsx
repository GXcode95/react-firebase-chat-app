import './style.scss'
import React, { useEffect, useState} from 'react'
import defaultAvatar from "assets/images/defaultAvatar.png"
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from 'services/firebase'

const Contact = ({chatId, contact, penpal, selectPenpal, user}) => {
  const [data, setData] = useState()

  useEffect(() => {
    if(chatId){
      const unsubscribe = onSnapshot(doc(db, 'lastMessage', chatId), (doc) => {
        setData(doc.data())
      })
    
      return () => unsubscribe()
    }
  }, [chatId])

  return (
    <div className='Contact'>
      <div className={`contact_container ${contact.uid === penpal.uid && "active"}`} onClick={e => selectPenpal(contact)}>
        <div className="contact_info">
          <div className="contact_detail">
            <img src={contact.avatar || defaultAvatar} alt="avatar" className="avatar"/>
            <h4>{contact.name}</h4>
            {data?.from !== user.uid && data?.unread && <small className='unread'>New</small>}
          </div>
          <div className={`contact_status ${contact.isOnline ? "online" : "offline"}`}></div>
        </div>
        {data && 
        <>  
          <p className="truncate last_message" >
            <strong>{data.from === user.uid && "Me:"}</strong>
            {data.text}
          </p>      
        </>
        }
      </div>
  
      <div className="contact_sm_container" onClick={e => selectPenpal(contact)}>
      <img src={contact.avatar || defaultAvatar} alt="avatar" className="avatar sm_screen"/>
      </div>
    </div>

  )
}

export default Contact