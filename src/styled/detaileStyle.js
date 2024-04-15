import { Button, Tab, Typography } from "@mui/material";
import { ErrorMessage } from "formik"

export const TabStyle = (props) => {
  return (
    <Tab
      style={{
        textTransform: "capitalize",
        fontWeight:"700",
        fontSize:"17px"
      }}
      {...props}
    />
  );
};
export const DraftButton = (props) => {
    return (
      <Button
        style={{
          textTransform: "capitalize",
          borderRadius:"20px",
        }}
        {...props}
      />
    );
  };
  export const BasicTypography = (props) => {
    return (
      <Typography
        style={{
          fontWeight:"bold",
          padding:"10px"
        }}
        {...props}
      />
    );
  };
  export const ContentTypography = (props) => {
    return (
      <Typography
        style={{
          fontWeight:"550",
          color:"gray",
          padding:"10px 10px 8px 0"
        }}
        {...props}
      />
    );
  };
  export const SubmitButton = (props) => {
    return (
      <Button
        style={{
          width:"220px",
          textTransform:"capitalize",
          marginTop:"30px"
        }}
        {...props}
      />
    );
  };
  export const DivErrorMessage = (props) => {
    return (
      <ErrorMessage
        style={{
         color:"red",
         fontSize:"13px",
        }}
        {...props}
      />
    );
  };
  export const InfoTypography = (props) => {
    return (
      <Typography
        style={{
         textAlign:"end",
        }}
        {...props}
      />
    );
  };