import { Typography, Button, TableCell } from "@mui/material";


export const DefineTypography = (props) => {
    return (
      <Typography
        style={{
          fontWeight:"bold",
          fontSize:"24px"
        }}
        {...props}
      />
    );
  };
  export const SmallTypography = (props) => {
    return (
      <Typography
        style={{
          fontSize:"14px",
          color:"gray"
        }}
        {...props}
      />
    );
  };
  export const ExportButton = (props) => {
    return (
      <Button
        style={{
          textTransform:"capitalize",
          color:"black"
        }}
        {...props}
      />
    );
  };
  export const AddButton = (props) => {
    return (
      <Button
        style={{
          textTransform:"capitalize",
          color:"white",
          backgroundColor:"green",
          margin:"5px"
        }}
        {...props}
      />
    );
  };
  export const TableCellStyle = (props) => {
    return (
      <TableCell
        style={{
         backgroundColor:"#c8e6c9",
        }}
        {...props}
      />
    );
  };