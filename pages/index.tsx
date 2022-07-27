import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <>
      <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] flex-1'>
        main
      </div>
      <div className='h-[92vh] overflow-hidden xl:hover:overflow-y-auto'>
        <Sidebar/>
      </div>
    </>
  )
}

export default Home
