import './sidebare.scss'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import React, { useState, useEffect } from 'react';


const Sidebar = () => {
   const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    // Check if user information exists in localStorage
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      // Now `userData` contains the user information
    } else {
      console.log('User information not found in localStorage');
    }
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  useEffect(() => {
    // Log the username when userData changes
    if (userData && userData.username) {
      console.log(userData.username);
    }
  }, [userData]);
   const { dispatch } = useContext(DarkModeContext);
  return (
    <div className='sidebar'>
        <div className='top'>
            <Link to="/home" style={{ textDecoration: "none" }}>
            <span className='logo'>Dashbord</span>
            </Link>
        </div>
        <hr />
        <div className='center'>
            <ul>
                <p className="title">MAIN</p>
                <Link to="/home" style={{ textDecoration: "none" }}>
                <li>
                  <DashboardIcon className="icon" />
                  <span>Home</span>
                </li>
                </Link>
                <p className="title">LISTS</p>
                <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
                </Link>
                <Link to="/requests" style={{ textDecoration: "none" }}>
                <li>
                   <StoreIcon className="icon" />
                   <span>Vacations Request</span>
                </li>
                </Link>

                <li>
                   <CreditCardIcon className="icon" />
                   <span>Orders</span>
                </li>
                <li>
                   <LocalShippingIcon className="icon" />
                   <span>Delivery</span>
                </li>
                <p className="title">USEFUL</p>
                <li>
                   <InsertChartIcon className="icon" />
                   <span>Stats</span>
                </li>
                <li>
                   <NotificationsNoneIcon className="icon" />
                   <span>Notifications</span>
                </li>
                <p className="title">SERVICE</p>
                <li>
                   <SettingsSystemDaydreamOutlinedIcon className="icon" />
                   <span>System Health</span>
                </li>
                <p className="title">USER</p>
                <li>
                   <PsychologyOutlinedIcon className="icon" />
                   <span>Logs</span>
                </li>
                <li>
                    <SettingsApplicationsIcon className="icon" />
                    <span>Settings</span>
                </li>
                <li>
                    <AccountCircleOutlinedIcon className="icon" />
                    <span>Profile</span>
                </li>
                <Link to="/" style={{ textDecoration: "none" }}>
                <li onClick={()=> {localStorage.clear();
                    window.location.href = '/';}}>
                    <ExitToAppIcon className="icon" />
                    <span>Logout</span>
                </li>
                </Link>
            </ul>
        </div>
     
        <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
 
    </div>
  )
}

export default Sidebar