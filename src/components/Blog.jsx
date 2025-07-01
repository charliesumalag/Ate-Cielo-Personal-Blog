import React from 'react'
import image1 from "../assets/img/travel.jpg";
import image3 from "../assets/img/travel3.jpg";
import image2 from "../assets/img/travel4.jpg";
import Footer from './Footer';


const Blog = () => {
  return (
    <div>
       <div className='flex flex-col gap-4 mb-6'>
        <h1 className='font-roboto text-[23px] font-bold text-center tracking-[0.8px] leading-[32px]'>Exploring the Hidden Gems of Northern Italy</h1>
        <div className='flex justify-center items-center gap-3' >
          <h5 className='uppercase font-roboto font-bold text-[#333] text-[13px] leading-[16px] tracking-[0.6px]'>Cielo</h5>
          <p className='uppercase leading-[14px] tracking-[0.6px] font-roboto text-[11.5px] text-[#999]'>Travel</p>
          <p className='uppercase leading-[14px] tracking-[0.6px] font-roboto text-[11.5px] text-[#999]'>--June 20,2025--</p>
        </div>
      </div>
      <div>
        <img src={image1} alt="" className='rounded-2xl'/>
      </div>
      <div className='flex flex-col justify-center m-auto gap-[21px] mt-8 font-lora text-[16px] leading-[29px] w-[75%] text-[#222]'>
        <p className=''><span className='font-semibold'>It’s no secret </span> that the digital industry is booming. From exciting startups to global brands, companies are reaching out to digital agencies, responding to the new possibilities available. However, the industry is fast becoming overcrowded, heaving with agencies offering similar services — on the surface, at least.
        </p>
        <p className=''>Producing creative, fresh projects is the key to standing out. Unique side projects are the best place to innovate, but balancing commercially and creatively lucrative work is tricky. So, this article looks at how to make side projects work and why they’re worthwhile, drawing on lessons learned from our development of the ux ompanion app.
        </p>
         <p className=''>Being creative within the constraints of client briefs, budgets and timelines is the norm for most agencies. However, investing in research and development as a true, creative outlet is a powerful addition. In these side projects alone, your team members can pool their expertise to create and shape their own vision — a powerful way to develop motivation, interdisciplinary skills and close relationships.
        </p>
      </div>
     <hr className="mt-8 border-t-1 border-gray-200" />
      <div className='mt-8'>
        <h2 className='text-[1.17em] font-lora font-bold mb-4'>Related Post:</h2>
        <div className='flex gap-8 justify-center'>
          <div className='w-[33%]'>
            <div className='h-[200px] w-full'>
              <img className='rounded-2xl h-full transition-transform duration-300 hover:scale-105 cursor-pointer' src={image1} alt="" />
            </div>
            <h3 className='text-[14px] leading-[22px] font-lora tracking-[0.8px] font-bold my-3'>Exploring the Hidden Gems of Northern Italy</h3>
          </div>
          <div className='w-[33%]'>
            <div className='h-[200px] w-full'>
              <img className='rounded-2xl h-full w-full transition-transform duration-300 hover:scale-105 cursor-pointer' src={image2} alt="" />
            </div>
            <h3 className='text-[14px] leading-[22px] font-lora tracking-[0.8px] font-bold my-3'>Chasing Sunrises in Peru: A Backpacker's Guide to the Sacred Valley</h3>
          </div>
          <div className='w-[33%]'>
            <div className='h-[200px] w-full'>
              <img className='rounded-2xl w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer' src={image3} alt="" />
            </div>
            <h3 className='text-[14px] leading-[22px] font-lora tracking-[0.8px] font-bold my-3'>Exploring the Hidden Gems of Northern Italy</h3>
          </div>
        </div>
      </div>
      <hr className="mb-8 mt-4 border-t-1 border-gray-200" />
      <div className='mb-20'>
        <h2 className='text-[1.17em] font-lora font-bold mb-4'>3 comments</h2>
        <div className='flex gap-5 my-5'>
          <div className='overflow-hidden'>
            <img src={image1} alt="" className='w-[60px] h-[40px] rounded-[50%]' />
          </div>
          <div>
            <div>
              <h3 className='font-bold'>Charlie</h3>
              <span className='text-xs text-gray-400 mr-2'>May 22, 2015 at 7:49 am</span> <span className='text-xs font-medium cursor-pointer' >  Reply</span>
              <p className='font-lora text-[16px] leading-[29px] w-[75%] text-[#222]'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
            </div>
            <div className='flex gap-5 my-5'>
              <div className='overflow-hidden'>
                <img src={image1} alt="" className='w-[60px] h-[40px] rounded-[50%]' />
              </div>
              <div>
                <h3 className='font-bold'>Charlie</h3>
                <span className='text-xs text-gray-400 mr-2'>May 22, 2015 at 7:49 am</span> <span className='text-xs font-medium cursor-pointer' >  Reply</span>
                <p className='font-lora text-[16px] leading-[29px] w-[75%] text-[#222]'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-5 my-5'>
          <div className='overflow-hidden'>
            <img src={image1} alt="" className='w-[60px] h-[40px] rounded-[50%]' />
          </div>
          <div>
            <h3 className='font-bold'>Charlie</h3>
            <span className='text-xs text-gray-400 mr-2'>May 22, 2015 at 7:49 am</span> <span className='text-xs font-medium cursor-pointer' >  Reply</span>
            <p className='font-lora text-[16px] leading-[29px] w-[75%] text-[#222]'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
          </div>
        </div>
      </div>
      <hr className="mb-8 border-t-1 border-gray-200" />
    </div>
  )
}

export default Blog
