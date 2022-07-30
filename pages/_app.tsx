import '../styles/globals.css'
import '../styles/enLogoTyping.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='xl:w-[1200px] m-auto'>
        <Navbar/>
        <div className='flex'>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}

export default MyApp
