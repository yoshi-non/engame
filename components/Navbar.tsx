import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
        <div className='w-[100px] md:w-[130px]'>
            <Image
              width={200}
              height={100}
              className='cursor-pointer'
              src="/home-logo.png"
              alt="Kagari's Portfolio"
              layout='responsive' 
            />
        </div>
      </Link>
      <div className='relative flex gap-5 md:gap-10'>
        <Link href="/News">
            <div className='flex flex-col items-center justify-center cursor-pointer transition ease-in-out delay-150 duration-300 hover:opacity-50'>
                <p className='italic font-bold text-theme text-2xl font-body'>NEWS</p>
                <span className='text-[0.8em]'>最新情報</span>
            </div>
        </Link>
        {/* <Link href="/contact">
            <div className='flex flex-col items-center justify-center cursor-pointer transition ease-in-out delay-150 duration-300 hover:opacity-50'>
                <p className='italic font-bold text-theme text-2xl font-body'>CONTACT</p>
                <span className='text-[0.8em]'>お問い合わせ</span>
            </div>
        </Link> */}
      </div>
    </div>
  )
}

export default Navbar