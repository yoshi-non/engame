import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LogoTypingBg from '../components/LogoTypingBg'
import logoData from "../logoData"

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

  // 現在出力している問題のカウント
  const [dataCount, setDataCount] = useState(0)

  // 問題情報
  const data = logoData
  const answerImgData = data.map(item => item["url"])
  let answerImg = answerImgData[dataCount]
  const answerTextData = data.map(item => item["name"])
  let answerText = answerTextData[dataCount]
  // 現在入力しているテキスト
  const [currentText, setCurrentText] = useState("")
  // 現在入力している位置
  const [position, setPosition] = useState(0)  
  
  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {

    if (secs === 0 && !gameTime) {
      if (e.code === 'Space') {
        setSeconds(5)
        setGameTime(60 + 5)
      }
    }

    if (secs === 0 && gameTime) {
      // 入力したキーと現在入力しようとしている文字が一致するとき
      if (e.key === answerText[position]) {
        // 現在の文字を入力済とする
        setCurrentText(currentText + e.key)
        // まだ入力していない文字があるとき
        if (position <= answerText.length - 2) {
          // 次の位置へ移動
          setPosition(position + 1)
        }  
        // 全ての文字を入力し終わったとき
        if (position === answerText.length - 1) {
          setDataCount(dataCount + 1)
          if (dataCount < data.length - 1) {
            // 次の問題あるとき次の問題を表示
            answerImg = answerImgData[dataCount]
            answerText = answerImgData[dataCount]
          } else {
            // 次の問題がないとき終了
            setGameTime(null)
          }
          setCurrentText("")
          setPosition(0)
        }
      }
    }

  }

  return (
    <div
      className='relative w-full h-[700px] overflow-hidden'
      onKeyDown={keyDownHandler}
      tabIndex={0}
    >
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
          <div className='absolute w-full h-[700px] text-[2.5rem] font-medium text-white z-3 top-0'>
            <div className='flex justify-between items-center p-4'>
              <div>あと&nbsp;<span className='text-[3.4rem]'>{data.length - dataCount}</span>問</div>
              <div>残り&nbsp;<span className='text-[3.4rem]'>{gameTime}</span>秒</div>
            </div>
            <div className='flex flex-col justify-center items-center mt-10'>
              <Image
                src={answerImg}
                width={180}
                height={180}
                className="object-cover"
                alt="LOGO"
              />

              <div className='mt-10 text-[3rem] text-white'>{currentText}</div>

            </div>
          </div>
         )}
        {(secs == 0 && !gameTime) && (
          // ゲーム開始カウントダウン(secs) == 0 && ゲーム時間(gameTime) == null
          // ゲームが始まっていないとき
          <div 
            className='absolute w-full h-[700px] text-3xl font-medium z-3 flex flex-col justify-center items-center'
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