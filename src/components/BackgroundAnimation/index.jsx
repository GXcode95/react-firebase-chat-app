import React, { useState, useContext, useEffect } from  'react'
import { ThemeContext } from 'context/theme'
import './style.scss'
import Stars from './Stars'
import Bubbles from './Bubbles'
import Bokeh from './Bokeh'
import Matrix from './Matrix'
const animations = { Stars, Bubbles, Bokeh, Matrix }

const BackgroundAnimation = () => {
  const { theme } = useContext(ThemeContext)
  const [animation, setAnimation] = useState()

  useEffect(()=> {    
    console.log(theme.bgAnimation)
    if( theme.bgAnimation !== 'Matrix')
      setAnimation(animations[theme.bgAnimation])
  }, [theme])

  return (
    <div>
      {theme.bgAnimation === 'Matrix' ? 
        <Matrix />: animation
      
      }
    </div>
  )
}
export default BackgroundAnimation