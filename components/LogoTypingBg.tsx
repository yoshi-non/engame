import React, { useEffect, useRef } from 'react'

const LogoTypingBg = () => {
  const canvasRef = useRef(null);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  }
  
  const cols = Math.floor(2400 / 20) + 1;
  const ypos = Array(cols).fill(0);
  
  useEffect(() => {
    const matrix = () => {
      const ctx: CanvasRenderingContext2D = getContext();
      ctx.fillStyle = '#0001';
      ctx.fillRect(0,0, 2400, 700);
      ctx.fillStyle = '#0f5';
      ctx.font = '20pt Arial Monospaced MT Std';
      console.log(ctx)
      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
      });
    }
    setInterval(matrix, 44);
  })

  return (
    <canvas className="canvas z-1 absolute w-full h-full" width={700} height={600} ref={canvasRef} />
  )
}

export default LogoTypingBg
