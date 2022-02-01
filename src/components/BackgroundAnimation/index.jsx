import React, { useContext } from  'react'
import { ThemeContext } from 'context/theme'

const BackgroundAnimation = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
    </div>
  )
}

export default BackgroundAnimation