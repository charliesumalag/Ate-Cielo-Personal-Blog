import React, { useContext, useEffect } from 'react'
import { AppContext } from "../../context/AppContext";
import { useState } from 'react';

const Card = ({text, number, icon, bgcolor}) => {



  return (
    <div className='rounded-xl font-roboto flex items-center gap-4 border border-gray-200 w-[200px] px-3 py-6 '>
      <div className={`p-3 ${bgcolor} rounded-full`}>
        {icon}
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-gray-600'>{text}</p>
        <p className='text-xl font-bold'>{number}</p>

      </div>
    </div>
  )
}

const Dashboard = () => {
   const {user} = useContext(AppContext);
  const [totalPost, setTotalPost] = useState(null);
  const token = localStorage.getItem('token');

  const fetchTotalPost = async () => {
    const res = await fetch(`/api/users/${user.id}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setTotalPost(data.length);
    }

  }

  useEffect(() => {
    fetchTotalPost();
  },[]);
  console.log(totalPost);


  return (
    <div className='flex flex-wrap gap-8 '>
      {totalPost &&  <Card text='Published Blogs'  icon={<i className="fa-solid fa-file-pen text-2xl text-white"></i>} number={totalPost} bgcolor='bg-blue-600'  />}
      <Card text='Views'  icon={<i className="fa-solid fa-eye text-2xl text-white"></i>} number={50} bgcolor='bg-yellow-400'   />
      <Card text='Comments'  icon={<i className="fa-solid fa-comment text-2xl text-white"></i>} number={50} bgcolor='bg-violet-900'   />
      <Card text='Likes'  icon={<i className="fa-solid fa-thumbs-up text-2xl text-white"></i>} number={50} bgcolor='bg-green-900'   />
    </div>
  )
}

export default Dashboard
