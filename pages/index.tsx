import Image from 'next/image'
import Link from 'next/link'
import logo from "../images/logo.png"
import LogoTyping from "../images/LogoTyping.png"
import FourChoice from "../images/FourChoice.png"
import { client } from '../libs/client'
import { Blog } from '../types/blog'
import styles from "../styles/Home.module.scss"

type Props = {
  blog: Array<Blog>
}

// SSG
export const getStaticProps = async() => {
  const data = await client.get({ endpoint: "blog" })

  return {
    props: {
      blog: data.contents
    }
  }
}

const Home = ({blog}: Props) => {
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
                  src={FourChoice}
                  height={1080}
                  width={1920}
              />
              <div className="p-2">
                  <p className="truncate max-w-md">2022.08.07</p>
                  <h2 className="mt-1 text-xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">エンジニア常識クイズ</h2>
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
                  <p className="truncate max-w-md">2022.08.??</p>
                  <h2 className="mt-1 text-xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">乞うご期待</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className='overflow-hidden xl:hover:overflow-y-auto'>
        <div className='w-0 md:w-[300px] xl:w-[350px] bg-gray-300'>
          <div className='flex flex-col justify-center'>
            <div className='flex justify-between p-3'>
              <p className='text-white'>お知らせ</p>
              <Link href="/">
                <p className='text-theme font-bold'>全て見る</p>
              </Link>
            </div>
            {blog.map(blog => (
              <div key={blog.id} className='bg-white p-3 border-b border-dotted border-gray-500'>
                <p className='text-gray-500'>{blog.createdAt.slice(0 ,10 )}</p>
                <h1 className='font-bold text-xl'>
                  {blog.title}
                </h1>
                <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }} className={styles.post}></div>              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
