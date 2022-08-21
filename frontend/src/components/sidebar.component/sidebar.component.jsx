import React, { useState,useEffect,useRef } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaList} from "react-icons/fa";
import {  FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";
import './sidebar.component.css'


const Sidebar = () => {
    const [countryData,setCountryData] = useState([]);
    const [menuCollapse, setMenuCollapse] = useState(false)
    const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const [country,setCountry] = useState([]);
  const [states,setStates] = useState([]);
  const countrySelectChangeHandler = (event)=>{
    setCountry(event.target.value);
    setStates(countryData[event.target.value])
  }

  const stateSelectChangeHandler = (event)=>{

  }

  let getStatesOptions = states.map((item,index)=>{
    return(<option key={index} value={item}>{item}</option>)
  });

  let getCountryOptions = Object.keys(countryData).map((item,index)=>{
    return(<option key={index} value={item}>{item}</option>)
  });

  useEffect(() => {
    fetch('http://localhost:5500/data/countryData/countries',{
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
       
        setCountryData(data);
    setStates(data[Object.keys(data)[0]]);
    });
    
  }, []);
  

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<FaList />}>
                Country : <select  name="country" id="country" onChange={countrySelectChangeHandler}>
                    {getCountryOptions}
                </select>
              </MenuItem>
              <MenuItem icon={<FaList />}>
                State :  <select  option name="country" id="country" onChange={stateSelectChangeHandler}>
                    {getStatesOptions}
                </select>
              </MenuItem>
            </Menu>
          </SidebarContent>
          
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;