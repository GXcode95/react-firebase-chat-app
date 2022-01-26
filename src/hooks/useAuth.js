import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db} from 'services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { updateDoc, setDoc, Timestamp, doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext)
}

// Provider hook that creates auth object and handles state
const useProvideAuth = ()  => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  
  // All methods related to auth here, have to update the user  State to work
  const register = async (name, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', response.user.uid), {
        // here we setup the user info on firestore, in addition of auth setup
        uid: response.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      })
      navigate("/")
    } catch (error) {
      // console.log(error)
    }
  };
  const signin = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      await updateDoc(doc(db, 'users', response.user.uid), {
        // update the user status in firestore
        isOnline: true,
      })
      navigate("/")
    } catch (error) {
      // console.log(error)
    }
  };
  const signout = async () => {
    await updateDoc(doc( db, 'users', auth.currentUser.uid), {
      // update the user status in firestore
      isOnline: false,
    })
    signOut(auth)
    navigate('/login')
  };

  //? Functions to implement later...
  const sendPasswordResetEmail = (email) => {
  
  };
  const confirmPasswordReset = (code, password) => {
  
  };
  //? ...................


  // Subscribe to user on mount (using JWT)
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  // Return the user object and auth methods
  return {
    user,
    register,
    signin,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };

}
