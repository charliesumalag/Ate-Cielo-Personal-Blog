import React from 'react'
import image1 from "../assets/img/travel.jpg";

const About = () => {
  return (
    <div className='m5-6 mb-12 font-lora w-full flex flex-col'>
      <div className='flex flex-col mb-4'>
        <h1 className='font-roboto text-[18px] font-bold text-left tracking-[0.8px] leading-[32px]'>Share your voice. ThoughtHatch is open to all.</h1>
      </div>
      <div>
        <img src={image1} alt="" className=''/>
      </div>
      <div className='flex flex-col justify-center m-auto gap-[21px] mt-8 font-lora text-[16px] leading-[29px] w-[100%] pr-10 text-[#222]'>
        <p className=''><span className='font-semibold'>Hi, I'm Charlie Sumalag</span>, the developer behind this platform. I built ThoughtHatch because I believe everyone should have a space to express themselves freely — without noise, paywalls, or unnecessary restrictions. Whether you're a writer, developer, student, hobbyist, or someone with thoughts to share, this platform is for you. Anyone can create an account, publish blog posts, and engage through comments.</p>
        <div>
          <h2 className='font-semibold'>Why I Built This</h2>
          <p className='indent-6'>I wanted to create a simple, clean, and truly open space where your voice matters — whether it's your first post or your hundredth. No distractions. Just honest writing and genuine connection.</p>
        </div>
        <div>
          <h2 className='font-semibold'>What You Can Do Here</h2>
          <ol className='list-decimal pl-8'>
            <li>Write and share your own blog posts</li>
            <li>Comment and engage with others</li>
            <li>Comment and engage with others</li>
          </ol>
        </div>
        <div>
          <h2 className='font-semibold'>Join the Community</h2>
          <p className='indent-6'>This is just the beginning — and you're part of it. Share your thoughts, read what others are thinking, and be part of a platform built for everyone.</p>
        </div>
      </div>
    </div>
  )
}

export default About
