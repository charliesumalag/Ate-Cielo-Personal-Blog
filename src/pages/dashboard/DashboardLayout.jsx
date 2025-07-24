import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../../components/dashboard/DashboardNav'
import {AppContext} from "../../context/AppContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const DashboardLayout = () => {
  const {user} = useContext(AppContext);
  return (
    <>
      {!user ?  (
          <div>
            <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        ) :
        (<div className='flex gap-10 h-screen'>
        <div>
          <Nav />
        </div>
        <div className='py-6 w-full'>
          <Outlet />
        </div>
      </div>)}
    </>


  )
}

export default DashboardLayout
