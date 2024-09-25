import React, { useState } from 'react'
import { RiMenuFoldLine, RiDashboardLine, RiUserLine, RiSettingsLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const SideBar: React.FC<{ setActiveComponent: (component: string) => void }> = ({ setActiveComponent }) => {

  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState<string>(''); // Default active icon



  return (
    <>
      <div className="flex">
      <div className="w-[5rem] bg-[#17314E] text-white p-5 flex flex-col justify-between">
        <div>
          <div className="text-white ml-2">
            <RiMenuFoldLine size={35} />
          </div>
          <ul className="mt-10 py-2">
            <li 
            className="mt-4 cursor-pointer hover:text-[#a3cfff]" 
            onClick={() => navigate("/dashboard")}>
              <RiDashboardLine size={25} />
              
            </li>
            <li className="mt-10 cursor-pointer hover:text-[#a3cfff]"  onClick={() => navigate("/my-bio")}>
              <RiUserLine size={25} />
            </li>
            <li  className="mt-10 cursor-pointer hover:text-[#a3cfff]"  onClick={() => setActiveComponent('Component3')}>
              <RiSettingsLine size={25} />
            </li>
          </ul>
        </div>
        
      
        <div className="flex justify-center items-center mt-auto mb-5">
          <img 
            src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
            alt="User Avatar"
            className="rounded-full w-10 h-10 border-2 border-white" 
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default SideBar
