import Image from 'next/image'
import React from 'react'
import { client } from '../libs/client'
import { Blog } from '../types/blog'

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

const News = ({blog}: Props) => {
  return (
    <div className='relative w-full overflow-hidden'>
        <div className='flex flex-col items-center justify-center m-10'>
            <h1 className='font-bold text-3xl text-theme'>最新情報</h1>
            <p className='text-gray-500'>NEWS</p>
        </div>
        <div>
        {blog.map(blog => (
            <div
                key={blog.id}
                className='bg-white p-3 flex justify-center items-start border-b border-dotted border-gray-500'
            >
                <div className='w-[20%]'>
                    {blog.image ? (
                        <Image
                        layout='responsive'
                        src={blog.image.url}
                        height={1080}
                        width={1920}
                        />
                        ):(
                            <Image
                            layout='responsive'
                            src="/home-logo.png"
                            height={1080}
                            width={1920}
                            />
                            )}
                </div>
                <div className='flex-1 p-4 text-[1.2rem]'>
                    <p className='text-gray-500'>{blog.createdAt.slice(0 ,10 )}</p>
                    <h1 className='font-bold text-xl'>
                    {blog.title}
                    </h1>
                    <div className='leading-5 mt-2'>{blog.body}</div>
                </div>
              </div>
        ))}
        </div>
    </div>
  )
}

export default News