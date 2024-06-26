import React from 'react'
import { Header } from '../Components/Header'
import Students from '../Pages/Students';
import { PaperAirplaneIcon, UserIcon, AcademicCapIcon, ChartBarIcon, CalendarIcon, CogIcon, LogoutIcon } from '@heroicons/react/outline';

const Layout = () => {
  return (
    <div className="min-h-screen max-h-screen bg-purple-600 flex flex-col md:flex-row">
      {/* Left Side Menu */}
      <div className="w-30 md:w-30 bg-purple-600 p-5 hidden md:block">
      <div className="text-white transform rotate-90 cursor-pointer"><PaperAirplaneIcon className="h-12 w-12 mt-2 mb-16 text-white-500" /></div>
        <ul className="space-y-10">
          <li className="text-white cursor-pointer ml-3"><UserIcon className="h-6 w-6 mt-2 text-white-500" /></li>
          <li className="text-white cursor-pointer ml-3"><AcademicCapIcon className="h-6 w-6 mt-2 text-white-500"/></li>
          <li className="text-white cursor-pointer ml-3"><ChartBarIcon className="h-6 w-6 mt-2 text-white-500"/></li>
          <li className="text-white cursor-pointer ml-3"><CalendarIcon className="h-6 w-6 mt-2 text-white-500"/></li>
          <li className="text-white cursor-pointer ml-3"><CogIcon className="h-6 w-6 mt-2 text-white-500"/></li>
          <li className="text-white cursor-pointer ml-3 fixed bottom-6"><LogoutIcon className="h-6 w-6 mt-2 text-white-500"/></li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top Space */}
        <div className="hidden md:block h-5"></div>

        {/* Main Content */}
        <div className="flex-1 bg-white flex flex-col rounded-lg overflow-y-auto border border-purple-600">
            <Header/>
            <Students/>
        </div>

        {/* Bottom Space */}
        <div className="hidden md:block h-5"></div>
      </div>

      {/* Right Space */}
      <div className="hidden md:block w-5"></div>
    </div>
  )
}

export default Layout;