import React, { useEffect, useState } from 'react'
import fourChoiceData from '../fourChoiceData';
import Modal from 'react-modal'

const FourChoice = () => {

  const [secs, setSeconds] = useState(0);
  // ライフ
  const [gameLife, setGameLife] = useState(3);
  // 現在出力している問題のカウント
  const [dataCount, setDataCount] = useState(0)

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1)
      }
      if (secs === 0) {
        clearInterval(sampleInterval)
      }
    }, 1000);
    // 問題数が3問正解したら終了
    if (dataCount + 1 > 3) {
      setGameOn(false)
      setDataCount(0)
    }
    // ライフが0になったら終了
    if (gameLife == 0) {
      setGameOn(false)
      setDataCount(0)
    }
    return () => {
      clearInterval(sampleInterval)
    }
  })
  // ゲームが行えるかどうかの判定
  const [gameOn, setGameOn] = useState(false);
  // 結果画面を表示させるかの判定
  // const [result, setResult] = useState(false)
  // 正解している問題数
  const [correctCount, setCorrectCount] = useState(0)
  // 問題情報
  const data = fourChoiceData
  // 現在出力している問題情報
  const questionData = data.map(item => item["question"])
  let currentQuestion = questionData[dataCount]
  const choiceDataA = data.map(item => item["choiceA"])
  let currentChoiceA = choiceDataA[dataCount]
  const choiceDataB = data.map(item => item["choiceB"])
  let currentChoiceB = choiceDataB[dataCount]
  const choiceDataC = data.map(item => item["choiceC"])
  let currentChoiceC = choiceDataC[dataCount]
  const choiceDataD = data.map(item => item["choiceD"])
  let currentChoiceD = choiceDataD[dataCount]
  const answerData = data.map(item => item["answer"])
  let currentAnswer = answerData[dataCount]
  // ゲームスタート
  const gameStart = () => {
    setGameOn(true)
    setGameLife(3)
    setSeconds(3)
    setCorrectCount(0)
  }
  
  // 問題に答えた時の処理
  const answerCheck: any = (userChoice:any) => {
    if (userChoice == currentAnswer) {
      // 問題に正解したとき
      setDataCount(dataCount +1)
      setCorrectCount(correctCount + 1)
    } else {
      // 問題に間違えたとき
      setDataCount(dataCount +1)
      setGameLife(gameLife - 1)
    }
    
  }

  // modal
  // モーダルを画面中央に表示する用のスタイル
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      backgroundColor: "#ffffffb0",
      transform: 'translate(-50%, -50%)',
    },
  }
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className='relative w-full h-[700px] overflow-hidden bg-[#f5e4b7]'>

      {/* カウントダウン表示 */}
      {(secs > 0) && (
      <div className='absolute w-full h-[700px] text-[6rem] font-medium z-3 flex flex-col justify-center items-center'>
        <p>{secs}</p>
      </div>
      )}
      {/* 問題表示画面 */}
      {(secs == 0 && gameOn) && (
        <div className='absolute w-full h-[700px] text-[2.5rem] font-medium text-black z-3 flex flex-col justify-center items-center gap-5'>
          <div className='flex justify-between items-center w-[80%]'>
            <p>{dataCount + 1}/5</p>
            <p className='flex'>
              {"♥".repeat(gameLife)}
            </p>
          </div>
          <p className='border-[4px] border-black text-center py-5 w-[80%]'>{currentQuestion}</p>
          <p onClick={() => answerCheck(currentChoiceA)} className='border-[4px] border-black text-center w-[80%] cursor-pointer'><span>①</span>{currentChoiceA}</p>
          <p onClick={() => answerCheck(currentChoiceB)} className='border-[4px] border-black text-center w-[80%] cursor-pointer'><span>②</span>{currentChoiceB}</p>
          <p onClick={() => answerCheck(currentChoiceC)} className='border-[4px] border-black text-center w-[80%] cursor-pointer'><span>③</span>{currentChoiceC}</p>
          <p onClick={() => answerCheck(currentChoiceD)} className='border-[4px] border-black text-center w-[80%] cursor-pointer'><span>④</span>{currentChoiceD}</p>
        </div>
      )}

      {/* ゲーム終了時結果画面 */}
      {/* 後で記載 */}

      {/* ホーム画面(ゲームが始まっていない) */}
      {(secs == 0 && !gameOn) && (
        <div className='absolute w-full h-[700px] text-[2.5rem] font-medium z-3 flex flex-col justify-center items-center gap-4'>
          <p className='text-[4rem] font-bold'>エンジニア常識クイズ</p>
          <div
            className='border-[4px] border-black text-center w-[80%] cursor-pointer'
            onClick={openModal}
          >
            遊び方
          </div>
          <div
            className='border-[4px] border-black text-center w-[80%] cursor-pointer'
            onClick={gameStart}
          >
            START
          </div>
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              onRequestClose={closeModal}
              ariaHideApp={false}
            >
              <div className='w-[45vw] text-xl text-gray-500 font-[500] p-10'>
                <div className='flex flex-col gap-10 justify-center items-center'>
                  <p>エンジニアの常識クイズです。</p>
                  <p className='text-center text-black bg-[#f5e4b7] px-7 py-3 rounded'>
                    ※現在はテスト中のため5問になります。
                  </p>
                  <p>※ライフは3つありクイズで間違えるとライフが1つ減り0になるとゲームが終了します。</p>
                  <p>
                    ゲーム中は「ESCキー」でタイトルに戻ります。<br />
                    「STARTボタン」を押すと始められます。
                  </p>
                  <button onClick={closeModal} className="text-white bg-[#3f403f73] px-5 py-3 rounded-full hover:opacity-70">閉じる</button>
                </div>
              </div>
            </Modal>
        </div>
      )}

    </div>
  )
}

export default FourChoice
