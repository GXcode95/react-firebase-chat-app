import React, { useState, useContext, useEffect } from  'react'
import { ThemeContext } from 'context/theme'
import './style.scss'
import Stars from './Stars'
import Bubbles from './Bubbles'
import Hearth from './Hearth'
import Bokeh from './Bokeh'
import Matrix from './Matrix'
// const animations = { Stars, Bubbles, Bokeh, Matrix, Hearth }

const BackgroundAnimation = () => {
  const { theme } = useContext(ThemeContext)
  const [animation, setAnimation] = useState()

  // useEffect(()=> {    
  //   console.log("BG::::",theme.bgAnimation)
  //   if (theme.bgAnimation)
  //     setAnimation(animations[theme.bgAnimation])
  // }, [])

  const animations = (name) => {
    switch(name){
      case 'Matrix':
        return <Matrix />;
      case 'Rainbowtrix':
        return <Matrix gradientmode={theme.gradientMode}/>;
      case 'Bokeh':
        return <Bokeh />; 
      case 'Hearth':
        return <Hearth />;
      case 'Bubbles':
        return <Bubbles />;  
      case 'Stars':
        return <Stars />; 
      default:;
    }
  }

  return (
    <>
    {theme.bgAnimation &&
      <div>
        {/* {theme.bgAnimation.includes('trix') ? 
          <Matrix gradientmode={theme.gradientMode} /> : animations

        } */}
        { console.log("BG::::", theme.bgAnimation) }
        {animations(theme.bgAnimation)}
      </div>
    }   
    </>
  )
}
export default BackgroundAnimation