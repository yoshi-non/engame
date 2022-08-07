import React, { useEffect, useState } from 'react'
import fourChoiceData from '../fourChoiceData';
import Modal from 'react-modal'

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
    <div className='relative w-full h-[700px] overflow-hidden bg-[#f5e4b7]'>

      {/* カウントダウン表示 */}
      {/* <div className='absolute w-full h-[700px] text-[6rem] font-medium text-white z-3 flex flex-col justify-center items-center'>
        <p>{secs}</p>
      </div> */}
      
      {/* 問題表示画面 */}
      {/* <div className='absolute w-full h-[700px] text-[2.5rem] font-medium text-black z-3 flex flex-col justify-center items-center gap-5'>
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
      </div> */}

      {/* ゲーム終了時結果画面 */}
      {/* 後で記載 */}

      {/* ホーム画面(ゲームが始まっていない) */}

      <div className='absolute w-full h-[700px] text-[2.5rem] font-medium z-3 flex flex-col justify-center items-center gap-4'>
        <p className='text-[4rem] font-bold'>エンジニア常識クイズ</p>
        <div
          className='border-[4px] border-black text-center w-[80%] cursor-pointer'
          // onClick={openModal}
        >
            遊び方
        </div>
        <div className='border-[4px] border-black text-center w-[80%] cursor-pointer'>START</div>
          {/* <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            <div className='w-[45vw] text-xl text-gray-500 font-[500] p-10'>
              <div className='flex flex-col gap-10 justify-center items-center'>
                <p>エンジニアならよく見かけるロゴの読み方を当ててタイピングするゲームです。</p>
                <p className='text-center text-white bg-[#0e5f1c] px-7 py-3 rounded'>
                  全30問で制限時間は60秒です
                </p>
                <p>
                  ゲーム中は「ESCキー」でタイトルに戻ります。<br />
                  「Spaceキー」で始められます。
                </p>
                <button onClick={closeModal} className="text-white bg-[#3f403f73] px-5 py-3 rounded-full hover:opacity-70">閉じる</button>
              </div>
            </div>
          </Modal> */}
      </div>
    </div>
  )
}

export default FourChoice
