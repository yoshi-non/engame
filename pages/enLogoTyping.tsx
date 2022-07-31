import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LogoTypingBg from '../components/LogoTypingBg'
import logoData from "../logoData"

const enLogoTyping = () => {
  const [data, setData] = useState(logoData)

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

  // 表示する文字
  const [text, setText] = useState("text text")
  // 現在入力している位置
  const [position, setPosition] = useState(0)

  const playingKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    // 文字の配列を取得
    let textSpans = document.querySelector("#textbox")!.children;
    // 入力したキーと現在入力しようとしている文字が一致するとき
    if (key === text[position]) {
    // 現在の文字を入力済とする
    textSpans[position].classList.add("typed-letters");
    textSpans[position].classList.remove("current-letter");
    // まだ入力していない文字があるとき
    if (position <= text.length - 2) {
      // 次の位置へ移動
      textSpans[position + 1].className = "current-letter";
      setPosition(position + 1);
      // 全ての文字を入力し終わったとき    
    } else {
      // 入力不可にする
      console.log("hello")
    }
    }
  }

  

  return (
    <div className='relative w-full h-[700px] overflow-hidden'>
        <LogoTypingBg/>

        {/* {(secs > 0 && gameTime) && (
          // ゲーム開始カウントダウン(secs) > 0 && ゲーム時間(gameTime) > 0
          // ゲームは始まっていないがカウントダウンは始まっているとき
          <div className='absolute w-full h-[700px] text-[6rem] font-medium text-white z-3 flex flex-col justify-center items-center'>
            <p>{secs}</p>
          </div>
        )} */}
        {/* {(secs == 0 && gameTime) && ( */}
          {/* // ゲーム開始カウントダウン(secs) == 0 && ゲーム時間(gameTime) > 0
          // ゲームが始まっているとき */}
          <div 
            className='absolute w-full h-[700px] text-[2.5rem] font-medium text-white z-3 top-0'
            onKeyDown={playingKeyDownHandler}
            tabIndex={0}
          >
            <div className='flex justify-between items-center p-4'>
              <div>あと&nbsp;<span className='text-[3.4rem]'>40</span>問</div>
              <div>残り&nbsp;<span className='text-[3.4rem]'>60</span>秒</div>
            </div>
            <div className='flex flex-col justify-center items-center mt-10'>
              <Image
                src={data[0].thumbnail.url}
                width={180}
                height={180}
                className="object-cover"
                alt="LOGO"
              />

              <div id="textbox" className='mt-10 text-white'>
                <span className='typed-letters'>{text[0]}</span>
                {text
                  .split("")
                  .slice(1)
                  .map(char => (
                    <span className="waiting-letters">{char}</span>
                  ))
                }
              </div>

            </div>
          </div>
         {/* )} */}
        {/* {(secs == 0 && !gameTime) && (
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
        )} */}
        
    </div>
  )
}

export default enLogoTyping