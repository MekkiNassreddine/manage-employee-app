import './table.scss'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { queryApi } from "../../utils/queryApi";
import React, { useState, useEffect } from 'react';

const List = ({id, employee}) => {
 
  const [err, setError] = useState({ visible: false, message: '' });
  const [vacationsData, setVacationsData] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  }
  
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await queryApi('leaves/identify/'+id, {}, 'GET', false );
        console.log("", response);

        if(response){
          const formattedData = response[0].map((vacation) => ({
            id: vacation.id,
            duration : vacation.duration,
            start_date: formatDate(vacation.start_date),
            id_card: vacation.id_card,
            validate: vacation.validate,
          }));
          setVacationsData(formattedData);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);


  return (
    <div>
  
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">Employee Name</TableCell>
          <TableCell className="tableCell">Vacation number</TableCell>
          <TableCell className="tableCell">Start Date</TableCell>
          <TableCell className="tableCell">Duration </TableCell>
          <TableCell className="tableCell">Return Date </TableCell>
          <TableCell className="tableCell">State </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vacationsData.map((vacation) => (
          <TableRow key={vacation.id}>
            
            <TableCell className="tableCell">{employee.full_name}</TableCell>
            <TableCell className="tableCell">{employee.nb_leaves}</TableCell>
            <TableCell className="tableCell">{vacation.start_date}</TableCell>
            <TableCell className="tableCell">{vacation.duration}</TableCell>
            <TableCell className="tableCell">{vacation.duration}</TableCell>
            <TableCell className="tableCell">
              <span className={`status ${vacation.validate}`}>{vacation.validate}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  );
}

export default List