import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../../components/dashboard/DashboardNav'
import {AppContext} from "../../context/AppContext";

const DashboardLayout = () => {
  const {user } = useContext(AppContext);
  return (
    <div className='flex gap-10 h-screen'>
      <div>
        <Nav />
      </div>
      <div className='py-6 w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
