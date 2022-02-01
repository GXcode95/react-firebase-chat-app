import './style.scss'
import React, { useContext, useEffect, useState} from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from 'services/firebase'
import { Box, Typography } from '@mui/material'
import Avatar from 'components/Avatar'
import LastMessage from 'components/LastMessage'
import { keyframes } from '@emotion/react'
import { ThemeContext } from 'context/theme'



const Contact = ({chatId, contact, penpal, selectPenpal, user}) => {
  const [data, setData] = useState()
  const {theme} = useContext(ThemeContext)
  const active = contact.uid === penpal.uid
  const newMessageAnimation = ( data?.from !== user.uid && data?.unread ) ? {animation: `${blink} 1s infinite`} : {}
  const userIsAuthor = data?.from === user.uid

  useEffect(() => {
    if(chatId){
      const unsubscribe = onSnapshot(doc(db, 'lastMessage', chatId), (doc) => {
        setData(doc.data())
      })
    
      return () => unsubscribe()
    }
  }, [chatId])


  const blink = keyframes({
    "0%": {
      backgroundColor: "transparent",
    },
    "50%": {
      backgroundColor: "transparent",
    },
    "51%": {
      backgroundColor: theme.palette.secondary.main,
    },
    "100%": {
      backgroundColor: theme.palette.secondary.main,
    }
  })

  return (
    <Box 
    className={`Contact ${active && theme.glass && 'glassmorph'}`} sx={newMessageAnimation}
    bgcolor={ active && !theme.glass && "primary.alt"} 
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