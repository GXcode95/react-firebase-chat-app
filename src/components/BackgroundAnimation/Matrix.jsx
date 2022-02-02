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
		context.fillStyle = '#0aff0a'
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
		this.fontSize = 25
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
}

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }
  
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext("2d")

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
        ctx.fillRect(0,0, canvas.width, canvas.height)
        
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
      } else {
        timer += deltaTime;
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render(0)
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...props} />
}

export default Canvas