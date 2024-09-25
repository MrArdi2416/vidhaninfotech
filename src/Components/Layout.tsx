import React, { useState } from 'react';
import SideBar from './SideBar';
import { Header } from './Header';



const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [activeComponent, setActiveComponent] = useState<string>('Dashboard');

 
  return (
    <>
      <div className="flex">
        <SideBar setActiveComponent={setActiveComponent}/>
        <div className="flex-1">
          <Header />
          <main className="">
             {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout