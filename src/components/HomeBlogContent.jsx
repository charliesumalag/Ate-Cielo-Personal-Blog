import React from 'react'
import { NavLink } from 'react-router-dom';

const HomeBlogContent = React.memo(({title,author, slug, category, tags, publishedAt, date, content, post }) => {


  return (
   <div className='font-lora w-[70%]'>
          <h3 className='font-bold font-poppins leading-[1.55em] tracking-[0.4px] text-[18px]'>{title}</h3>
          <div className='flex items-center  gap-3  mt-4' >
            <h5 className='uppercase font-roboto font-bold text-[#333] text-[13px] leading-[16px] tracking-[0.6px]'>{author ? author : 'Cielo'}</h5>
            <p className='uppercase leading-[14px] tracking-[0.6px] font-roboto text-[11.5px] text-[#999]'>{category}</p>
            <p className='uppercase leading-[14px] tracking-[0.6px] font-roboto text-[11.5px] text-[#999]'>--{date}--</p>
          </div>
          <div className='mt-2'>
            <p className='text-[14px] leading-[1.45em] text-[#777] tracking-[0.1px] font-roboto'>{content}</p>
          </div>
          <div className='mt-4 flex gap-3 items-center cursor-pointer w-full'>
            <NavLink to='/blog' className='text-[12px] tracking-[0.1px] leading-[1.45em] font-light font-roboto text-[#777] transition-all duration-300 ease-in-out  mr-2 py-1 px-4 hover:bg-[#FF374A] hover:text-white border border-[#FF374A] rounded-4xl'>Read more...</NavLink>
            <div className='flex text-base gap-1 mr-2'>
              {/* {tags.map((tag, index) => (
                 <p className='border border-gray-300 text-[#888] tracking-[0.1px] leading-[1.45em] font-roboto font-light py-1 px-3 rounded-4xl text-[12px]' key={index}>{tag}</p>
              ))} */}
            </div>
            <div className='text-[14px] flex items-center gap-1 text-[#777] pr-5'>
              <i className="fa-regular fa-comment "></i>
              <p>1</p>
            </div>
          </div>
        </div>
  )
})

export default HomeBlogContent
