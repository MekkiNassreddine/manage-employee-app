import './singleRequest.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import List from '../../components/table/Table'
import { queryApi } from "../../utils/queryApi";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const SingleRequest = () => {

  const [err, setError] = useState({ visible: false, message: '' });
  const [employeesData, setEmployeesData] = useState({});
  const [requestData, setRequestData] = useState({});
  const { id_card_request } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notificationData = await queryApi('leaves/state/' + id_card_request, {}, 'GET', false);
        const [userData, err] = await queryApi('employees/identify/' + id_card_request, {}, 'GET', false);
  
        console.log("dddddddddddddddddddd : ", notificationData);
  
        if (!userData) {
          setError({
            visible: true,
            message: JSON.stringify(err.errors, null, 2),
          });
          console.log(err);
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
          setEmployeesData(user);
        }
  
        if (Array.isArray(notificationData) && notificationData[0]) {
          const data = notificationData[0][0];
  
          const request = {
            id: data.id,
            id_card_employee: data.id_card_employee,
            duration: data.duration,
            start_date: data.start_date,
            validate: data.validate,
          };
          setRequestData(request);
        } else {
          console.log('No valid data found in notificationData:', notificationData);
        }
  
      } catch (error) {
        console.error('An error occurred:', error);
        setError('An error occurred while fetching data.');
      }
    };
  
    fetchData();
  }, []);
  
  const handleClickValide = async(event) => {
    const [updateEmployee, errUpdate] = await queryApi('employees/'+id_card_request, {}, 'PUT', false);
    const [validate, errValidate] = await queryApi('leaves/valide/'+requestData.id, {}, 'PUT', false);

    if(!errUpdate && !errValidate){
      toast.success('the employee vacation request has been accsepted !!', { position: toast.POSITION.TOP_RIGHT });
    }
    else{
      toast.error('An error occurred', { position: toast.POSITION.TOP_RIGHT });
    }
  }

  const handleClickRefuse = async(event) => {
    const [validate, errValidate] = await queryApi('leaves/refuse/'+requestData.id, {}, 'PUT', false);

    if(!errValidate){
      toast.success('the employee vacation request has been refused!!', { position: toast.POSITION.TOP_RIGHT });
    }
    else{
      toast.error('An error occurred', { position: toast.POSITION.TOP_RIGHT });
    }
  }



  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            
            <h1 className="title">Requet Detais</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">ssss{requestData.start_date}</h1>
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
            <div className="classButton">
                <button type="button" className='btnValidClass' onClick={handleClickValide}>Valid</button>
                <button type="button" className='btnRefuseClass'onClick={handleClickRefuse}>Refuse</button>
              </div>
          </div>
          <ToastContainer />
        </div>
        <div className="bottom">
        <h1 className="title">Last vacations</h1>
          <List id={ id_card_request } employee={employeesData}/>
        </div>
      </div>
    </div>
  )
}

export default SingleRequest