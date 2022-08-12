import Image from 'next/image'
import Link from 'next/link'
import { client } from '../libs/client'
import { Blog } from '../types/blog'
import engameData from '../engameData'

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
          {engameData.map((item) => (
            <Link href={`/${item.url}`} key={item.id}>
              <div className='overflow-hidden group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
                <Image
                    layout='responsive'
                    src={item.thumbnail}
                    height={1080}
                    width={1920}
                />
                <div className="p-2">
                    <p className="truncate max-w-md text-gray-500">{item.date}</p>
                    <h2 className="mt-1 text-xl transition-all duration-100 ease-in-out group-hover:font-bold">{item.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className='overflow-hidden xl:hover:overflow-y-auto'>
        <div className='w-0 md:w-[300px] xl:w-[350px]'>
          <div className='flex flex-col justify-center'>
            <div className='flex justify-between p-3'>
              <p className='font-bold text-xl'>お知らせ</p>
              <Link href="/News">
                <p className='text-theme text-xl font-bold cursor-pointer'>全て見る</p>
              </Link>
            </div>
            {blog.slice(0, 3).map(blog => (
              <div key={blog.id} className='bg-white p-3 border-b border-dotted border-gray-500'>
                <p className='text-gray-500'>{blog.createdAt.slice(0 ,10 )}</p>
                <h1 className='font-bold text-xl'>
                  {blog.title}
                </h1>
                <div className='leading-5 mt-2'>{blog.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
