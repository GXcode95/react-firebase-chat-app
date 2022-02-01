import React, { useState, useContext, useEffect } from  'react'
import { ThemeContext } from 'context/theme'
import './style.scss'
import Stars from './Stars'
import Bubbles from './Bubbles'
import Hearth from './Hearth'
const animations = { Stars, Bubbles, Hearth }

const BackgroundAnimation = () => {
  const { theme } = useContext(ThemeContext)
  const [animation, setAnimation] = useState()

  useEffect(()=> {    
    setAnimation(animations[theme.bgAnimation])
  }, [theme])

  return (
    <div className="wrapper">
      {animation}
    </div>
  )
}
export default BackgroundAnimation