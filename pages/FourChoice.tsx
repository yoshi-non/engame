import React, { useEffect, useState } from 'react'
import fourChoiceData from '../fourChoiceData';

const FourChoice = () => {
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
    }, 1000);
    if (gameTime === 0) {
      setResult(true)
      setGameTime(null)
      setDataCount(0)
    }
    return () => {
      clearInterval(sampleInterval)
    }
  })

  // 結果画面を表示させるかの判定
  const [result, setResult] = useState(false)
  // 正解している問題数
  const [correctCount, setCorrectCount] = useState(0)
  // 現在出力している問題のカウント
  const [dataCount, setDataCount] = useState(0)
  // 問題情報
  const data = fourChoiceData

  // ゲームスタート

  return (
    <div className='relative w-full h-[700px] overflow-hidden bg-[#eed284]'>
      {/* 問題表示画面 */}
      <div className='absolute w-full h-[700px] text-[2.5rem] font-medium text-black z-3 flex flex-col justify-center items-center gap-5'>
        <div className='flex justify-between items-center w-[80%]'>
          <p>01</p>
          <p>♥ ♥ ♥</p>
        </div>
        <p className='border-[4px] border-black text-center py-5 w-[80%]'>{data[0].question}</p>
        <p className='border-[4px] border-black text-center w-[80%] cursor-pointer'><span>①</span>{data[0].choiceA}</p>
        <p className='border-[4px] border-black text-center w-[80%] cursor-pointer'><span>②</span>{data[0].choiceB}</p>
        <p className='border-[4px] border-black text-center w-[80%] cursor-pointer'><span>③</span>{data[0].choiceC}</p>
        <p className='border-[4px] border-black text-center w-[80%] cursor-pointer'><span>④</span>{data[0].choiceD}</p>
        <div>10</div>
      </div>
    </div>
  )
}

export default FourChoice
