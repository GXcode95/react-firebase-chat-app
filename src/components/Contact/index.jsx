import './style.scss'
import React, { useEffect, useState} from 'react'
import Img from "assets/images/img.png"
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from 'services/firebase'

const Contact = ({chatId, contact, penpal, selectPenpal, user}) => {
  const [data, setData] = useState()
  console.log("chat", chatId, contact, penpal)
  useEffect(() => {
    if(chatId){
    const unsubscribe = onSnapshot(doc(db, 'lastMessage', chatId), (doc) => {
      setData(doc.data())
    })

    return () => unsubscribe()
  }
  }, [chatId])

  return (
    <div className={`Contact ${contact.uid === penpal.uid && "active"}`} onClick={e => selectPenpal(contact)}>
      <div className="contact_info">
        <div className="contact_detail">
          <img src={contact.avatar || Img} alt="avatar" className="avatar"/>
          <h4>{contact.name}</h4>
          {data?.from !== user.uid && data?.unread && <small className='unread'>New</small>}
        </div>
        <div className={`contact_status ${contact.isOnline ? "online" : "offline"}`}></div>
      </div>
      {data && 
      <>  
        <p className="truncate" >
          <strong style={{marginRight: "10px"}}>{data.from === user.uid && "Me:"}</strong>
          {data.text}
        </p>      
      </>
      }
    </div>
  )
}

export default Contact