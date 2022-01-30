import './style.scss'
import React, { useEffect, useState} from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from 'services/firebase'
import { Box } from '@mui/material'
import Avatar from 'components/Avatar'
import LastMessage from 'components/LastMessage'

const Contact = ({chatId, contact, penpal, selectPenpal, user}) => {
  const [data, setData] = useState()

  const active = contact.uid === penpal.uid
  const isNewMessage = data?.from !== user.uid && data?.unread 
  const userIsAuthor = data?.from === user.uid

  useEffect(() => {
    if(chatId){
      const unsubscribe = onSnapshot(doc(db, 'lastMessage', chatId), (doc) => {
        setData(doc.data())
      })
    
      return () => unsubscribe()
    }
  }, [chatId])

  return (
    <Box className="Contact" 
      bgcolor={ active && "grey.600"} 
    >
      {/*********************
       **  Full Size Card  **
       *********************/}
      <Box display={{xs: "none", md: "block"}}
        onClick={e => selectPenpal(contact)}
      >
        <Box display="flex" alignItems="center">
          <Avatar img={contact.avatar} isOnline={contact.isOnline} />
          <p className="contact-name">
            {contact.name}
          </p>
          { isNewMessage && <small className='unread'>New</small> }
        </Box>
         <LastMessage text={data?.text} isAuthor={userIsAuthor} /> 
      </Box>
  
      {/*********************
       **  Small Card  **
       *********************/}
      <Box display={{xs: "flex", md:"none"}} 
        justifyContent="center"
        onClick={e => selectPenpal(contact)}
      >
        <Avatar img={contact.avatar} isOnline={contact.isOnline} />
      </Box>
    </Box>

  )
}

export default Contact