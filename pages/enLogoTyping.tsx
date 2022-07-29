import React from 'react'

const enLogoTyping = () => {
  return (
    <div className='bg-theme font-medium text-3xl w-full h-[700px] flex flex-col justify-center items-center'>
        <p className='text-white mb-[100px]'>Engineer Logo Typing</p>
        <div className='text-center mb-10'>
            <div className='bg-primary rounded-full px-7 py-3 mb-5'>遊び方</div>
            <div className='bg-primary rounded-full px-7 py-3 mb-5'>設定</div>
        </div>
        <div className='text-white'>Spaceキーでスタート</div>
    </div>
  )
}

export default enLogoTyping