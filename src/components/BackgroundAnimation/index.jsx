import React, { useContext } from  'react'
import { ThemeContext } from 'context/theme'
import './style.scss'
const BackgroundAnimation = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div>
        {/* <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div> */}

        <div class="bubbles">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>
    </div>
  )
}

export default BackgroundAnimation