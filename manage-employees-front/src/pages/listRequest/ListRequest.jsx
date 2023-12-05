import "../list/list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import VacationRequest from "../../components/vacationRequest/VacationRequest"
import { useState, useEffect } from "react"


const ListRequest = () => {
  
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <VacationRequest />
      </div>
    </div>
  )
}

export default ListRequest