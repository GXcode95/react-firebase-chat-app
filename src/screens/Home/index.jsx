import './style.scss'
import React, { useState, useEffect } from 'react';
import { query } from 'firebase/firestore';
import { useAuth } from 'hooks/useAuth';
import { collection, onSnapshot, where } from 'firebase/firestore';
import { db } from 'services/firebase'
import User from 'components/User';

const Home = () => {
  const auth = useAuth()
  const [users ,setUsers] = useState([])
  const [penpal, setPenpal] = useState("")

  const selectUser = (user) => {
    setPenpal(user)
  }

  useEffect(() => {
    if(auth.user) {
      const userRef = collection(db, 'users')
      const q = query(userRef,where('uid', '!=', auth.user.uid))
      
      const unsubscribe = onSnapshot(q, querySnapshot => {
        let tmpUsers = []
        querySnapshot.forEach(doc => tmpUsers.push(doc.data()))
        setUsers(tmpUsers)
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
          <div className='messages_user'>
            <h3>{penpal.name}</h3>
          </div>
          :
          <h3 className="no_conv">Click on  a user to start a conversation</h3>
        }
      </div>
      {console.log(users)}
    </div>
  )
}

export default Home;
