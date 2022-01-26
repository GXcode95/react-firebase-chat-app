import { useEffect, useState } from 'react'
import { auth, db } from 'services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from "firebase/firestore"
const usersCollectionName  = "users"

const useAuth = () => {
  const [user, setUser] = useState()
  const [userStore, setUserStore] = useState()

  onAuthStateChanged(auth, (user) => {
    setUser(user)
    
  })
  

  return { user }
}

export default useAuth
// if (user) {

//   getDoc(doc(db, usersCollectionName, user.uid )).then((docSnap => {
//     if (docSnap.exists) {
//       setUserStore(docSnap.data())
//     }
//   }))
// }