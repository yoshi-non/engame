import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LogoTypingBg from '../components/LogoTypingBg'
import logoData from "../logoData"
import Modal from 'react-modal'

const LogoTyping = () => {

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
      setCurrentText("")
      setPosition(0)
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
  const data = logoData
  const answerImgData = data.map(item => item["url"])
  let answerImg = answerImgData[dataCount]
  const answerTextData = data.map(item => item["name"])
  let answerText = answerTextData[dataCount]
  // 問題をランダムに出すようにする
  function arrayShuffle(array: any) {
    for(var i = (array.length - 1); 0 < i; i--){
      // 0〜(i+1)の範囲で値を取得
      var r = Math.floor(Math.random() * (i + 1));
      // 要素の並び替えを実行
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
  }
  
  // 現在入力しているテキスト
  const [currentText, setCurrentText] = useState("")
  // 現在入力している位置
  const [position, setPosition] = useState(0)
  
  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (secs === 0 && !gameTime && !result) {
      // ゲームスタート
      if (e.code === 'Space') {
        setIsOpen(false)
        setSeconds(3)
        setGameTime(60 + 3)
        setCorrectCount(0)
        arrayShuffle(data)
      }
    }

    if (secs === 0 && gameTime) {
      // ゲーム中断
      if (e.code === 'Escape') {
        setGameTime(null)
        setCurrentText("")
        setPosition(0)
        setDataCount(0)
      }
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
          setCorrectCount(correctCount + 1)
          if (dataCount < data.length - 1) {
            // 次の問題あるとき次の問題を表示
            answerImg = answerImgData[dataCount]
            answerText = answerImgData[dataCount]
          } else {
            // 次の問題がないとき終了
            setResult(true)
            setGameTime(null)
            setDataCount(0)
          }
          setCurrentText("")
          setPosition(0)
        }
      }
    }
    if (result) {
      if (e.code === 'Escape') {
        setResult(false)
      }
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
              <div className='p-5 bg-[#ffffffa8] rounded'>
                <Image
                  src={answerImg}
                  width={180}
                  height={180}
                  className="object-cover"
                  alt="LOGO"
                />
              </div>
              <div className='mt-10 text-[3rem] text-white'>{currentText}</div>
            </div>
          </div>
         )}
           {/* ゲームを終了させたときの結果画面 */}
        {result && (
          <div className='absolute w-full h-[700px] text-[2rem] text-gray-800 font-medium z-3 flex flex-col justify-center items-center'>
            <div className='p-5 flex flex-col justify-center items-center gap-5 bg-[#ffffffb0] rounded'>
              <p>30問中<span className='text-[2.5rem]'>{correctCount}</span>問タイプしました。</p>
              <button onClick={() => setResult(false)} className='text-white bg-[#3f403f73] px-5 py-3 rounded-full hover:opacity-70'>ホームに戻る</button>
              <p>※ESCキーでホームに戻れます</p>
            </div>
          </div>
        )}
        {!result && 
          (secs == 0 && !gameTime) && (
            // ゲーム開始カウントダウン(secs) == 0 && ゲーム時間(gameTime) == null
            // ゲームが始まっていないとき
            <div className='absolute w-full h-[700px] text-3xl font-medium z-3 flex flex-col justify-center items-center'>
              <p className='enLogoTitle text-white mb-[100px]'>Engineer Logo Typing</p>
              <div className='text-center mb-10'>
                <div
                  className='cursor-pointer bg-black shadow-[#0f5] tracking-widest shadow text-white bg-opacity-75 rounded-full px-7 py-3 mb-10 hover:opacity-70'
                  onClick={openModal}
                >
                  遊び方
                </div>
                <Modal
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
                </Modal>
              </div>
              <div className='enLogoStart text-white tracking-wide'>Spaceキーでスタート</div>
            </div>
          )
        }
        
    </div>
  )
}

export default LogoTyping