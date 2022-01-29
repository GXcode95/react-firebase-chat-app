import './style.scss'
import React, { useEffect, useState} from 'react'
import defaultAvatar from "assets/images/defaultAvatar.png"
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from 'services/firebase'
import { Box } from '@mui/material'

const Contact = ({chatId, contact, penpal, selectPenpal, user}) => {
  const [data, setData] = useState()
  const active = contact.uid === penpal.uid
  useEffect(() => {
    if(chatId){
      const unsubscribe = onSnapshot(doc(db, 'lastMessage', chatId), (doc) => {
        setData(doc.data())
      })
    
      return () => unsubscribe()
    }
  }, [chatId])

  return (
    <Box className={`Contact `}
      bgcolor={ active && "grey.600"}
      p="10px 10px 20px 10px"
      sx={{cursor: "pointer"}}
      
    >
      <Box className='contact_container'
        display={{xs: "none", md: "block"}}
        onClick={e => selectPenpal(contact)}
      >
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
      </Box>
  
      <Box 
        display={{xs: "flex", md:"none"}} 
        justifyContent="center"
        onClick={e => selectPenpal(contact)}
      >
        <img src={contact.avatar || defaultAvatar} alt="avatar" className="avatar sm_screen"/>
      </Box>
    </Box>

  )
}

export default Contact