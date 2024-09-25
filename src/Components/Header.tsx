import React from "react";
import { RiLogoutCircleLine, RiMenuFoldLine } from "react-icons/ri";
import { MdOutlineSettingsSuggest, MdSettingsEthernet } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
 
export const Header = () => {
 
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        dispatch(logout());
        navigate('/login');
      };
 
  return (
 
   
    <nav className="bg-[#17314E] p-4 flex items-center justify-between">
      <div className="flex  w-full  text-white justify-between space-x-4">
        <div className="flex h-8 ">
          <div>
            <button className="bg-white hover:bg-[#5c6875] text-[#17314E] font-bold py-1 h-8 px-2 rounded-lg inline-flex justify-between">
              <MdOutlineSettingsSuggest  size={20}/>
              <span className="text-[#17314E] mx-2">Settings</span>
            </button>
          </div>
     
        </div>
        <div className="flex ">
            <div className="mr-4">
              <button className="" onClick={handleLogout}>

                <RiLogoutCircleLine size={30}  />
              </button>
            </div>
        </div>
      </div>
    </nav>
  );
};