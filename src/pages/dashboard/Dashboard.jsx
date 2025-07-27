import React, { useContext, useEffect } from 'react'
import { AppContext } from "../../context/AppContext";
import { useState } from 'react';
import Card from "../../components/dashboard/Card";


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
      <Card text='Views'  icon={<i className="fa-solid fa-eye text-2xl text-white"></i>} number={0} bgcolor='bg-yellow-400'   />
      <Card text='Comments'  icon={<i className="fa-solid fa-comment text-2xl text-white"></i>} number={0} bgcolor='bg-violet-900'   />
      <Card text='Likes'  icon={<i className="fa-solid fa-thumbs-up text-2xl text-white"></i>} number={0} bgcolor='bg-green-900'   />
    </div>
  )
}

export default Dashboard
