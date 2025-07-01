import React from 'react'
import image1 from "../assets/img/travel.jpg";

const About = () => {
  return (
    <div className='m5-6 mb-12 font-lora w-full flex flex-col'>
      <div className='flex flex-col mb-4'>
        <h1 className='font-roboto text-[18px] font-bold text-left tracking-[0.8px] leading-[32px]'>Hi, I Am Cielo Sumalag</h1>
      </div>
            <div>
              <img src={image1} alt="" className=''/>
            </div>
            <div className='flex flex-col justify-center m-auto gap-[21px] mt-8 font-lora text-[16px] leading-[29px] w-[100%] pr-10 text-[#222]'>
              <p className=''><span className='font-semibold'>It’s no secret </span> that the digital industry is booming. From exciting startups to global brands, companies are reaching out to digital agencies, responding to the new possibilities available. However, the industry is fast becoming overcrowded, heaving with agencies offering similar services — on the surface, at least.
              </p>
              <p className=''>Producing creative, fresh projects is the key to standing out. Unique side projects are the best place to innovate, but balancing commercially and creatively lucrative work is tricky. So, this article looks at how to make side projects work and why they’re worthwhile, drawing on lessons learned from our development of the ux ompanion app.
              </p>
               <p className=''>Being creative within the constraints of client briefs, budgets and timelines is the norm for most agencies. However, investing in research and development as a true, creative outlet is a powerful addition. In these side projects alone, your team members can pool their expertise to create and shape their own vision — a powerful way to develop motivation, interdisciplinary skills and close relationships.
              </p>
            </div>
    </div>
  )
}

export default About
