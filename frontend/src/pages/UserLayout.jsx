import React from 'react'

import { Outlet } from 'react-router-dom';
import Navbar from '../componenets/Navbar';

function UserLayout() {
  return (
    <div className='flex w-full min-h-screen'>
        <Navbar className="w-full"/>
        <div className='MainContent w-full ml-60 min-h-screen bg-white flex flex-col justify-center items-center'>
            <Outlet/>
        </div>
    </div>
  )
}

export default UserLayout
