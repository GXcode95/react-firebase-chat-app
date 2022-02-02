import React, { useState, useContext, useEffect } from  'react'
import { ThemeContext } from 'context/theme'
import './style.scss'
import Stars from './Stars'
import Bubbles from './Bubbles'
import Hearth from './Hearth'
import Bokeh from './Bokeh'
import Matrix from './Matrix'
const animations = { Stars, Bubbles, Bokeh, Matrix, Hearth }

const BackgroundAnimation = () => {
  const { theme } = useContext(ThemeContext)
  const [animation, setAnimation] = useState()

  useEffect(()=> {    
    console.log(theme.bgAnimation)
      setAnimation(animations[theme.bgAnimation])
  }, [theme])

  return (
    <div>
      {theme.bgAnimation.includes('trix') ? 
        <Matrix gradientmode={theme.gradientMode} /> : animation
      
      }
    </div>
  )
}
export default BackgroundAnimation