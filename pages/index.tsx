import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Sidebar from '../components/Sidebar'
import logo from "../images/logo.png"
import LogoTyping from "../images/LogoTyping.png"

const Home: NextPage = () => {
  return (
    <>
      <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] flex-1'>
        <div className='px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap gap-5 justify-center'>
          <Link href="/LogoTyping">
            <div className='bg-gray-300 overflow-hidden p-2 border-black border group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
              <Image
                  layout='responsive'
                  src={LogoTyping}
                  height={1080}
                  width={1920}
              />
              <div className="p-2">
                  <p className="truncate max-w-md">2022.08.01</p>
                  <h2 className="mt-1 text-xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">Engineer Logo Typing</h2>
              </div>
            </div>
          </Link>

          <Link href="/FourChoice">
            <div className='bg-gray-300 overflow-hidden p-2 border-black border group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
              <Image
                  layout='responsive'
                  src={logo}
                  height={1080}
                  width={1920}
              />
              <div className="p-2">
                  <p className="truncate max-w-md">text</p>
                  <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">title</h2>
              </div>
            </div>
          </Link>

          <Link href="/">
            <div className='bg-gray-300 overflow-hidden p-2 border-black border group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
              <Image
                  layout='responsive'
                  src={logo}
                  height={1080}
                  width={1920}
              />
              <div className="p-2">
                  <p className="truncate max-w-md">text</p>
                  <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">title</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className='overflow-hidden xl:hover:overflow-y-auto'>
        <Sidebar/>
      </div>
    </>
  )
}

export default Home
