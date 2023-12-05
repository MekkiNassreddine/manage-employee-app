import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebare from '../../components/sidebar/Sidebar'
import Widget from '../../components/widget/Widget'
import React, { useState, useEffect } from 'react';

const Home = () => {
  
  return (
    <div className="home">
      <Sidebare />
      <div className="homeContainer">
         <Navbar />
         <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
       
      </div>
    </div>
    
  )

}

export default Home
