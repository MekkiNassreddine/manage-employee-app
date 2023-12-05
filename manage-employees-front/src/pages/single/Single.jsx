import './single.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import List from '../../components/table/Table'
import { queryApi } from "../../utils/queryApi";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Single = () => {

  const [err, setError] = useState({ visible: false, message: '' });
  const [employeesData, setEmployeesData] = useState({});
  const { id_card } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, err] = await queryApi('employees/identify/'+id_card, {}, 'GET', false );

        if (!userData) {
          setError({
            visible: true,
            message: JSON.stringify(err.errors, null, 2),
          });
        } else { 

          const { response } = userData;

           const user = {
            id: response.id_employee,
            full_name: response.full_name,
            email: response.email,
            id_card: response.id_card,
            role: response.role,
            nb_leaves: response.nb_leaves,
            state: response.state,
          };
          setEmployeesData(user)
       };
        
      } catch (error) {
        console.error('An error occurred:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Employee 1111111111:', employeesData);
  }, [employeesData]);
  console.log(id_card)

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{employeesData.full_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{employeesData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">National ID Card:</span>
                  <span className="itemValue">{employeesData.id_card}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">State:</span>
                  <span className={`cellWithState ${employeesData.state}`}>
                  {employeesData.state}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        <div className="bottom">
        <h1 className="title">Last vacations</h1>
          <List id={ id_card } employee={employeesData}/>
        </div>
      </div>
    </div>
  )
}

export default Single