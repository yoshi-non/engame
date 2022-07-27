import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
        <Navbar/>
        <div className='flex gap-6 md:gap-20'>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}

export default MyApp
