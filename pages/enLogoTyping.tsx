import React from 'react'
import LogoTypingBg from '../components/LogoTypingBg'

const enLogoTyping = () => {

  return (
    <div className='relative w-full h-[700px] overflow-hidden'>
        <LogoTypingBg/>
        <div className='absolute w-full h-[700px] text-3xl font-medium z-3 flex flex-col justify-center items-center'>
            <p className='text-white mb-[100px]'>Engineer Logo Typing</p>
            <div className='text-center mb-10'>
                <div className='bg-primary rounded-full px-7 py-3 mb-5'>遊び方</div>
                <div className='bg-primary rounded-full px-7 py-3 mb-5'>設定</div>
            </div>
            <div className='text-white'>Spaceキーでスタート</div>
        </div>
    </div>
  )
}

export default enLogoTyping