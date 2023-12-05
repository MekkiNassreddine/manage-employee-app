import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { queryApi } from '../../utils/queryApi';
import Navbar from '../../components/navbar/Navbar';
import List from '../../components/table/Table';

const yupSchema = Yup.object({
  duration: Yup.string().required('Field required!'),
  start_date: Yup.string().required('Field required!'),
});

const HomeEmployee = ({ employee }) => {
  const [noRow, setNoRow] = useState('');
  const [error, setError] = useState({ visible: false, message: '' });
  const [requestData, setRequestData] = useState({});
  const [disableNewRequestButton, setDisableNewRequestButton] = useState('');

  useEffect(() => {
    console.log(employee.id_card)
    const fetchData = async () => {
      try {
        const id= employee.id_card
        console.log("********************************************"+id)
        const response = await queryApi('leaves/identify/'+id, {}, 'GET', false);

        const notificationData = await queryApi('leaves/state/'+id, {}, 'GET', false);

        if (!response) {
          setNoRow('no row to show');
        } else {
          //console.log("responce :"+response)
        }
        if (notificationData != null) {
          setDisableNewRequestButton('disable')
          const { responseData } = notificationData;

           const request = {
            id: responseData.id,
            id_card_employee: responseData.id_card_employee,
            duration: responseData.duration,
            start_date: responseData.start_date,
            validate: responseData.validate,
            archives: responseData.archives,
          };
          setRequestData(request)
        } else{
           setNoRow('notification');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setError({ visible: true, message: 'An error occurred while fetching data.' });
      }
    };
    fetchData();
  }, [employee.id_card]);
  console.log("No Row Value : "+noRow)


  const formik = useFormik({
    initialValues: {
      id_card_employee: parseInt(employee.id_card, 10),
      duration: '',
      start_date: '',
    },
    validationSchema: yupSchema,
   
    onSubmit: async (values, { resetForm }) => {
      //console.log("values   :: " +values.start_date)
      try {
        const [requestData, err] = await queryApi('leaves/request', values, 'POST', false);

        if (!requestData) {
          setError({
            visible: true,
            message: JSON.stringify(err.errors, null, 2),
          });
          toast.error('Failed to send your request', { position: toast.POSITION.TOP_RIGHT });
        } else {
          toast.success('Your request is being processed', { position: toast.POSITION.TOP_RIGHT });
          resetForm();
        }
      } catch (error) {
        setError({ visible: true, message: 'An error occurred during login.' });
        toast.error('An error occurred', { position: toast.POSITION.TOP_RIGHT });
      }
    },
  });

  function handleClickB1(event) {
    setNoRow('notification')
    console.log('click 1 :', noRow);
  }

  function handleClickB2(event) {
    setNoRow("no row to show");
    console.log('click 2 :', noRow);
  }

  function handleClickB3(event) {
    setNoRow("new request");
    console.log('click 3 :', noRow);
  }

  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="buttonClass">
            <button type="button" className="classButton" onClick={handleClickB1}>
              Vacation Request Notification
            </button>
            <button type="button" className="classButton" onClick={handleClickB2}>
              Show All Vacation Request
            </button>
            <button type="button"  
              className="classButton" onClick={handleClickB3} >
              New Vacation Request
            </button>
          </div>
        </div>
        <div className="employeeContainer">
          <div className="employee">
            {noRow === "notification" && (
              <div>
                <div className='notification'> 
                  <span> Notification: </span> 
                  <div className='notificationText'> Dear Ms. {employee.full_name}, your request has been
                   forwarded to the Administration Service. You will receive a validation 
                  notification at the earliest convenience. Stay connected.
                   </div>
                </div>
                <div className='lineStyle' ></div>
              </div>   
            )}
            {noRow === "new request" &&(
              <form onSubmit={formik.handleSubmit}>
                <div className="formInput">
                  <label>Vacation Duration</label>
                  <input
                    id="duration"
                    type="text"
                    name="duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.duration && formik.errors.duration && (
                    <div className="errorText">{formik.errors.duration}</div>
                  )}
                </div>
                <div className="formInput">
                  <label>Start Day Vacation</label>
                  <input
                    id="start_date"
                    type="date" // Use date type for date input
                    name="start_date"
                    value={formik.values.start_date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.start_date && formik.errors.start_date && (
                    <div className="errorText">{formik.errors.start_date}</div>
                  )}
                </div>
                <button type="submit">Lunch Request</button>
                <div>
                <ToastContainer />
                </div>
              </form>
            )}

            {noRow  == "no row to show"  &&
              <div>
               
                <div className='notification'> 
                  <span> Notification: </span> 
                  <div className='notificationText'> you will resieve notifications here !!
                    <div className='notificationText'>
                        To initiate a new leave request, kindly click on the "New Request" button.
                    </div>
                   </div>
                </div>
              
                <List id={employee.id_card} employee={employee} />
              </div>
              }
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEmployee;
