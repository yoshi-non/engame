import React, { useEffect, useState } from 'react'
import LogoTypingBg from '../components/LogoTypingBg'

const enLogoTyping = () => {

  const [secs, setSeconds] = useState(0);
  const [gameTime, setGameTime] = useState<number | null>(null)
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1)
      }
      if (gameTime) {
        setGameTime(gameTime - 1)
      }
      if (secs === 0) {
        clearInterval(sampleInterval)
      }
      if (gameTime === 0) {
        setGameTime(null)
        clearInterval(sampleInterval)
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval)
    }
  })

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;
    if (key === 'Space') {
      setSeconds(5)
      setGameTime(60 + 5)
    }
  }
  return (
    <div className='relative w-full h-[700px] overflow-hidden'>
        <LogoTypingBg/>

        {(secs > 0 && gameTime) && (
          // ゲーム開始カウントダウン(secs) > 0 && ゲーム時間(gameTime) > 0
          // ゲームは始まっていないがカウントダウンは始まっているとき
          <div className='absolute w-full h-[700px] text-[6rem] font-medium text-white z-3 flex flex-col justify-center items-center'>
            <p>{secs}</p>
          </div>
        )}
        {(secs == 0 && gameTime) && (
          // ゲーム開始カウントダウン(secs) == 0 && ゲーム時間(gameTime) > 0
          // ゲームが始まっているとき
          <div className='absolute w-full h-[700px] text-[6rem] font-medium text-white z-3 flex flex-col justify-center items-center'>
            <p>{gameTime}</p>
          </div>
        )}
        {(secs == 0 && !gameTime) && (
          // ゲーム開始カウントダウン(secs) == 0 && ゲーム時間(gameTime) == null
          // ゲームが始まっていないとき
          <div 
            className='absolute w-full h-[700px] text-3xl font-medium z-3 flex flex-col justify-center items-center'
            onKeyDown={keyDownHandler}
            tabIndex={0}
          >
            <p className='enLogoTitle text-white mb-[100px]'>Engineer Logo Typing</p>
            <div className='text-center mb-10'>
              <div className='cursor-pointer bg-black shadow-[#0f5] tracking-widest shadow text-white bg-opacity-75 rounded-full px-7 py-3 mb-10'>遊び方</div>
              <div className='cursor-pointer bg-black shadow-[#0f5] tracking-widest shadow text-white bg-opacity-75 rounded-full px-7 py-3 mb-10'>設定</div>
            </div>
            <div className='enLogoStart text-white tracking-wide'>Spaceキーでスタート</div>
          </div>
        )}
        
    </div>
  )
}

export default enLogoTyping