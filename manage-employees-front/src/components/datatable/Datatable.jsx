import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { queryApi } from "../../utils/queryApi";
import React, { useState, useEffect } from 'react';
import RadioFilter from './RadioFilter';

const Datatable = () => {
  const [err, setError] = useState({ visible: false, message: '' });
  const [employeesData, setEmployeesData] = useState([]);
  const [rowEmployeesData, setRowEmployeesData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await queryApi('employees/all', {}, 'GET', false );
        console.log("1", response);
      
        const formattedData = response[0].map((employee) => ({
          id: employee.id_employee,
          full_name: employee.full_name,
          email: employee.email,
          id_card: employee.id_card,
          role: employee.role,
          nb_leaves: employee.nb_leaves,
          state: employee.state,
        }));
        
        setEmployeesData(formattedData);
        setRowEmployeesData(formattedData);
      } catch (error) {
        console.error('An error occurred:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);


  const filterOptions = [
    { value: 'all', label: 'All Employees' },
    { value: 'On-Work', label: 'On Work' },
    { value: 'On-Vacation', label: 'On Vacation' },
  ];

  useEffect(() => {
    // Filter employeesData based on the selected filter value
    const filteredData = filterEmployees(employeesData, filter);
    setRowEmployeesData(filteredData);
  }, [filter, employeesData]);

  const filterEmployees = (data, selectedFilter) => {
    if (selectedFilter === 'all') {
      return data; // Show all employees
    } else {
      // Implement your specific filtering logic based on the selected filter
      // For example, filter by state
      return data.filter(employee => employee.state === selectedFilter);
    }
  };

  const handleRadioChange = (value) => {
    setFilter(value);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "full_name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "id_card", headerName: "National ID_card", width:200 },
    { field: "nb_leaves", headerName: "Vacation Number", width: 150 },
    { field: "state", headerName: "State", width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.state}`}>
          {params.row.state}
        </div>
      );
    }, },   
  ];
  
  const handleDelete = (id) => {
    
  };

  const actionColumn = [ // to add cellul to the datatable
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id_card}`} style={{ textDecoration: "none" }}>
             <div className="viewButton">View</div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Employees
       
           <RadioFilter options={filterOptions} onChange={handleRadioChange} />
     
        
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      
      <DataGrid 
        className="datagrid" 
        rows={rowEmployeesData} 
        columns={columns.concat(actionColumn)} 
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
       />
    </div>
  );
};

export default Datatable;