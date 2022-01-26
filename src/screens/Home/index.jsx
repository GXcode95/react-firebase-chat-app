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

  useEffect(() => {
    if(auth.user) {
      const userRef = collection(db, 'users')
      const q = query(userRef,where('uid', '!=', auth.user.uid))
      
      const unsubscribe = onSnapshot(q, querySnapshot => {
        let tmpUsers = []
        querySnapshot.forEach(doc => tmpUsers.push(doc.data()))
        setUsers(tmpUsers)
      })

      return () => unsubscribe()
    }
  }, [auth]);
  
  return (
    <div className="Home">
      <div className="users_container">
        {users.map( user => <User key={user.uid} user={user}/> )}
      
      </div>
      Home Page
      {console.log(users)}
    </div>
  )
}

export default Home;
