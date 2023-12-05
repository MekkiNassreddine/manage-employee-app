import "./vacationRequest.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { queryApi } from "../../utils/queryApi";
import React, { useState, useEffect } from 'react';


const VacationRequest = () => {
  const [err, setError] = useState({ visible: false, message: '' });
  const [requestsData, setRequestsData] = useState([]);
  const [foundData, SetFoundData] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await queryApi('leaves/requests', {}, 'GET', false );
        console.log("1", response);
        if(response === null){
          SetFoundData("Not Found Requests")
          console.log(foundData)
        }else{
          const formattedData = response[0].map((request) => ({
            id: request.id,
            id_card_employee: request.id_card_employee,
            duration: request.duration,
            start_date: request.start_date,
            validate: request.validate,   
          }));
          
          setRequestsData(formattedData);

        }
        
      } catch (error) {
        console.error('An error occurred:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);
 
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "id_card_employee", headerName: "ID Card", width: 200 },
    { field: "duration", headerName: "Duration", width: 200 },
    { field: "start_date", headerName: "Start Date", width: 400 },
    {
      field: "validate",
      headerName: "Validate",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`cellWithValidate ${params.row.validate}`}>
            {params.row.validate}
          </div>
        );
      },
    },
  ];
 
  const actionColumn = [ // to add cellul to the datatable
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/requests/${params.row.id_card_employee}`} style={{ textDecoration: "none" }}>
             <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">

    <div className="datatableTitle">
          All Requests
        </div>
        <DataGrid 
          className="datagrid" 
          rows={requestsData} 
          columns={columns.concat(actionColumn)} 
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
    </div>
  );
};

export default VacationRequest;