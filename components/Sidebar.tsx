import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-0 md:w-[300px] xl:w-[350px] bg-gray-300'>
      <div className='flex flex-col justify-center'>
        <div className='flex justify-between p-3'>
          <p className='text-white'>お知らせ</p>
          <Link href="/">
            <p className='text-theme font-bold'>全て見る</p>
          </Link>
        </div>

        <div className='bg-white p-3 border-b border-dotted border-gray-500'>
          <p className='text-gray-500'>2022. 1. 1</p>
          <p>
            Webツールに対称落書きツールをUPしました。点対称や線対称を使って簡単に派手な模様を描けるツールです
          </p>
        </div>
        
        <div className='bg-white p-3 border-b border-dotted border-gray-500'>
          <p className='text-gray-500'>2022. 1. 1</p>
          <p>
            Webツールに対称落書きツールをUPしました。点対称や線対称を使って簡単に派手な模様を描けるツールです
          </p>
        </div>
        
        <div className='bg-white p-3 border-b border-dotted border-gray-500'>
          <p className='text-gray-500'>2022. 1. 1</p>
          <p>
            Webツールに対称落書きツールをUPしました。点対称や線対称を使って簡単に派手な模様を描けるツールです
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar