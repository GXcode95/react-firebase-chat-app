import React, { useRef, useEffect } from 'react'
class Symbol {
	constructor(x, y, fontSize, canvasHeight) {
		this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		this.x = x
		this.y = y
		this.text = ''
		this.canvasHeight = canvasHeight
		this.fontSize = fontSize
	}
	draw(context){
		this.text = this.characters.charAt(Math.random() * (this.characters.length -1)) // pick a random char
		// move char form one line, until it reach bottom
		context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize) 
		if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
			this.y = 0;
		} else {
			this.y += 1;
		}
	}
}

class Effect {
	constructor(canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth
		this.canvasHeight = canvasHeight
		this.fontSize = 15
		this.columns = this.canvasWidth / this.fontSize
		this.symbols = []
		this.#initialize()
	}
	// The hash at the beginning of a class function declaration means it's a private function
	// this is call abstraction, wich means ...
	// ... hidding internal functionnaity and implementation details... 
	// ... of our object and only exposing essential information to the user.
	#initialize(){
		for(let i = 0; i < this.columns; i++) {
			this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
		}
	}
  resize(width, height) {	// Resize the canvas, then restart the animation
		this.canvasWidth = width;
		this.canvasHeight = height;
		this.columns = this.canvasWidth / this.fontSize;
		this.symbols = []
		this.#initialize()
	}
}

const Canvas = props => {
  
  const canvasRef = useRef(null)
    
  
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }
  
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext("2d")

    // createLinearGradient will create a gradient object 
    // ctx.createLinearGradient(startX, startY, endX, endY)
    let gradient = ctx.createLinearGradient(0,canvas.width, canvas.height, 0)

    // addColorStop(offSet, color)
    // offSet is between 0 and 1
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(0.2, 'yellow')
    gradient.addColorStop(0.4, 'green')
    gradient.addColorStop(0.6, 'cyan')
    gradient.addColorStop(0.8, 'blue')
    gradient.addColorStop(1, 'magenta')


    const effect = new Effect(canvas.width, canvas.height)
    // handle animation speed
    let lastTime = 0;
    const fps = 15;
    const nextFrame = 1000/fps;
    let timer = 0;
    let animationFrameId
    
    //Our draw came here
    const render = (timeStamp) => {
      // deltaTime is the difference (in ms) between the previous... 
      // ... animation frame and the current one.
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp

      if(timer > nextFrame) {
        // Here we use a rectangle to cover the char...
        // ... so it will slowly disapear.
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
    		ctx.textAlign ='center'

        ctx.fillRect(0,0, canvas.width, canvas.height)
        ctx.fillStyle = props.gradientmode ? gradient : 'rgba(0, 255, 0)'
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
      } else {
        timer += deltaTime;
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render(0)
    // Handle Responsive
    window.addEventListener('resize', () => {
	    canvas.width = window.innerWidth
	    canvas.height = window.innerHeight
    	effect.resize(canvas.width, canvas.height)
    })
    
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas