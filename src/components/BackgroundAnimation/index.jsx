import React, { useState, useContext, useEffect } from  'react'
import { ThemeContext } from 'context/theme'
import './style.scss'
import Stars from './Stars'
import Bubbles from './Bubbles'
import Bokeh from './Bokeh'

const animations = { Stars, Bubbles, Bokeh }

const BackgroundAnimation = () => {
  const { theme } = useContext(ThemeContext)
  const [animation, setAnimation] = useState()

  useEffect(()=> {    
    console.log(theme.bgAnimation)
    setAnimation(animations[theme.bgAnimation])
  }, [theme])

  return (
    <div>
        {animation}
    </div>
  )
}
export default BackgroundAnimation