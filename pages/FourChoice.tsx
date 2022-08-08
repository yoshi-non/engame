import React, { useEffect, useState } from 'react'
import fourChoiceData from '../fourChoiceData';
import Modal from 'react-modal'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ClearIcon from '@mui/icons-material/Clear';

const FourChoice = () => {

  // 問題が表示されるまでのカウントダウン
  const [secs, setSeconds] = useState(0)
  // ライフ
  const [gameLife, setGameLife] = useState(3)
  // 現在出力している問題のカウント
  const [dataCount, setDataCount] = useState(0)
  // ゲームが行えるかどうかの判定
  const [gameOn, setGameOn] = useState(false)
  // 結果画面を表示させるかの判定
  const [result, setResult] = useState(false)
  // 正解している問題数
  const [correctCount, setCorrectCount] = useState(0)
  // 正解エフェクト
  const [correctEffect, setCorrectEffect] = useState(false)
  // 不正解エフェクト
  const [incorrectEffect, setIncorrectEffect] = useState(false)
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

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1)
      }
      if (secs === 0) {
        clearInterval(sampleInterval)
      }
      if (correctEffect) {
        setCorrectEffect(false)
      }
      if (incorrectEffect) {
        setIncorrectEffect(false)
      }
    }, 1000)
    // 全問正解したら終了
    if (dataCount + 1 > 10) {
      setResult(true)
    }
    return () => {
      clearInterval(sampleInterval)
    }
  })

  // ゲームスタート
  const gameStart = () => {
    setGameOn(true)
    setGameLife(3)
    setSeconds(3)
    setCorrectCount(0)
    setDataCount(0)
  }

  // ゲーム終了
  const gameFinish = () => {
    setResult(false)
    setGameOn(false)
    setDataCount(0)
  }
  
  // 問題に答えた時の処理
  const answerCheck: any = (userChoice:any) => {
    if (userChoice == currentAnswer) {
      // 問題に正解したとき
      setDataCount(dataCount +1)
      setCorrectCount(correctCount + 1)
      setCorrectEffect(true)
      setIncorrectEffect(false)
    } else {
      // 問題に間違えたとき
      setGameLife(gameLife - 1)
      setCorrectEffect(false)
      setIncorrectEffect(true)
      // ライフが0になったら終了
      if (gameLife - 1 == 0) {
        setResult(true)
      }
      setDataCount(dataCount +1)
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
      {/* 正解エフェクト */}
      {correctEffect && (
        <div className='absolute w-full h-[700px] z-[-1] flex justify-center items-center text-red-600'>
          <RadioButtonUncheckedIcon  style={{ fontSize: 320 }} className='correctEffect' />
        </div>
      )}
      {/* 不正解エフェクト */}
      {incorrectEffect && (
        <div className='absolute w-full h-[700px] z-[-1] flex justify-center items-center text-red-600'>
          <ClearIcon style={{ fontSize: 320 }} className='correctEffect' />
        </div>
      )}
      {/* 問題表示画面 */}
      {(secs == 0 && gameOn && !result && dataCount < 10) && (
        <div className='absolute w-full h-[700px] text-[2.5rem] font-medium text-black z-3 flex flex-col justify-center items-center gap-5'>
          <div className='flex justify-between items-center w-[80%]'>
            <p>{dataCount + 1}/10</p>
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
      {(secs == 0 && gameOn && result) && (
        <div className='absolute w-full h-[700px] text-[2.5rem] font-medium z-3 flex flex-col justify-center items-center gap-4'>
          <p className='text-[4rem] font-bold mb-5'>RESULT</p>
          <p>10問中<span className='text-[3rem]'>{correctCount}</span>問正解しました。</p>
          <button
            onClick={gameFinish}
            className='border-[4px] border-black text-center w-[80%] cursor-pointer'
          >
            ホームに戻る
          </button>
        </div>
      )}

      {/* ホーム画面(ゲームが始まっていない) */}
      {(secs == 0 && !gameOn && !result && dataCount == 0) && (
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
                    ※現在はテスト中のため10問になります。
                  </p>
                  <p>※ライフは3つありクイズで間違えるとライフが1つ減り0になるとゲームが終了します。</p>
                  <p>
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
