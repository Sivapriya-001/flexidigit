import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddButton, DefineTypography, ExportButton, SmallTypography, TableCellStyle } from "../styled/tableStyle";

const TableComponent = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const fetchData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users`);
      const data = await response.json();
      setUserData(data.users);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = () => {
    if (orderBy) {
      return userData.slice().sort((a, b) => {
        const orderValue = order === 'asc' ? 1 : -1;
        if (a[orderBy] < b[orderBy]) return -1 * orderValue;
        if (a[orderBy] > b[orderBy]) return 1 * orderValue;
        return 0;
      });
    }
    return userData;
  };
  const sortedUserData = sortedData();

  function convertToCSV(data) {
    const header = Object.keys(data[0]).join(",") + "\n";
    const body = data
      .map((item) => Object.values(item).join(",") + "\n")
      .join("");
    return header + body;
  }
  
  // Function to initiate CSV download
  function downloadCSV() {
    const visibleData = sortedUserData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    const csvData = convertToCSV(visibleData);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "userData.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <DefineTypography>Define Employee</DefineTypography>
          <SmallTypography>Manage all your existing Employees or add new Employee</SmallTypography>
        </Grid>
        <Grid>
          <ExportButton variant="outlined" onClick={downloadCSV}>
            <ArrowUpwardIcon />
            Export
          </ExportButton>
            <Link to={"/"}>
             <AddButton><AddIcon /> Add</AddButton> 
            </Link>
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 550, marginTop:"20px", borderRadius:"10px" }}>
        <Table stickyHeader
                  aria-label="sticky table"
                  sx={{ height: "55vh" }}>
          <TableHead>
            <TableRow>
            <TableCellStyle  onClick={() => handleRequestSort('id')}>Employee ID</TableCellStyle>
            <TableCellStyle onClick={() => handleRequestSort('firstName')} >Employee Name</TableCellStyle>
            <TableCellStyle onClick={() => handleRequestSort('email')}>Email</TableCellStyle>
            <TableCellStyle onClick={() => handleRequestSort('birthDate')} >Date of Birth</TableCellStyle>
            <TableCellStyle onClick={() => handleRequestSort('bloodGroup')} >Blood Group</TableCellStyle>
            <TableCellStyle onClick={() => handleRequestSort('company.title')}>Designation</TableCellStyle>
            <TableCellStyle onClick={() => handleRequestSort('phone')}>Phone</TableCellStyle>
            <TableCellStyle onClick={() => handleRequestSort('domain')}>Level</TableCellStyle>
            <TableCellStyle onClick={() => handleRequestSort('company.department')}>Department</TableCellStyle>
          </TableRow>
          </TableHead>
          <TableBody>
            {sortedUserData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell align="right">{`${employee.firstName} ${employee.lastName} ${employee.maidenName}`}</TableCell>
                <TableCell align="right">{employee.email}</TableCell>
                <TableCell align="right">{employee.birthDate}</TableCell>
                <TableCell align="right">{employee.bloodGroup}</TableCell>
                <TableCell>{employee.company.title}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.domain}</TableCell>
                <TableCell>{employee.company.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  );
};

export default TableComponent;

