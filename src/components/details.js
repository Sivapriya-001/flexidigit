import {
  Box,
  Card,
  Divider,
  Grid,
  Radio,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DisabledByDefaultSharpIcon from '@mui/icons-material/DisabledByDefaultSharp';
import {
  BasicTypography,
  ContentTypography,
  DivErrorMessage,
  DraftButton,
  SubmitButton,
  TabStyle,
  InfoTypography
} from "../styled/detaileStyle";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [isFormValid, setIsFormValid] = useState(true); 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted with values:", values);
    resetForm();
  };

  return (
    <Card>
      <Formik
        initialValues={{
          employeeID: "",
          employeeName: "",
          email: "",
          gender: "",
          dateOfBirth: null,
          bloodGroup: "",
          designation: "",
          department: "",
          phone: "",
          level: "",
        }}
        onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.level) {
          errors.level = "Level is required";
          setIsFormValid(true);
        } else {
          setIsFormValid(false); 
        }
        if (!values.employeeID) {
          errors.employeeID = "Please Enter Employee ID";
        }
      
        if (!values.employeeName) {
          errors.employeeName = "Please Enter Employee Name";
        }
      
        if (!values.email) {
          errors.email = "Please Enter Email";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }
      
        if (!values.gender) {
          errors.gender = "Please Enter Gender";
        }
      
        if (!values.bloodGroup) {
          errors.bloodGroup = "Please Enter BloodGroup";
        }
        if (!values.department) {
          errors.department = "Please Enter department";
        }
        if (!values.designation) {
          errors.designation = "Please Enter designation";
        }
        if (!values.phone) {
          errors.phone = "Required";
        } else if (!/^\d{10}$/i.test(values.phone)) {
          errors.phone = "Invalid phone number";
        }
        if (!values.level) {
          errors.level = "Please Enter level";
        }
        return errors;
      }}
      >
        {({ isValid }) => (
        <Form >
          <Box sx={{ width: "100%" }}>
            <Grid>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <TabStyle label="$ Employee Details" {...a11yProps(0)} />
                  <TabStyle label="$ Bank Details" {...a11yProps(1)} />
                 <DisabledByDefaultSharpIcon sx={{marginTop:"13px"}}/> <TabStyle label=" Employee History" {...a11yProps(2)} />
                 <DisabledByDefaultSharpIcon  sx={{marginTop:"13px"}}/> <TabStyle label="Documents" {...a11yProps(2)} />
                </Tabs>
                <InfoTypography>INFO</InfoTypography>
              </Box>
            </Grid>
            <Typography textAlign={"end"}>
              Employee Creation Status:{" "}
              <DraftButton variant="contained" disabled>
                Draft
              </DraftButton>
            </Typography>
            <Divider />
            <CustomTabPanel value={value} index={0}>
              <BasicTypography>Basic Details</BasicTypography>
              <Card>
                <Grid container m={2}>
                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <ContentTypography>Employee ID</ContentTypography>
                    <Field
                      inputProps={{
                        style: { height: "10px" },
                      }}
                      name="employeeID"
                      as={TextField}
                      placeholder="Enter Employee ID"
                    />
                    <DivErrorMessage name="employeeID" component="div" />
                  </Grid>
                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <ContentTypography>Employee Name</ContentTypography>
                    <Field
                      inputProps={{
                        style: { height: "10px" },
                      }}
                      name="employeeName"
                      as={TextField}
                      placeholder="Enter Employee Name"
                    />
                    <DivErrorMessage name="employeeName" component="div" />
                  </Grid>
                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <ContentTypography>Email</ContentTypography>
                    <Field
                      inputProps={{
                        style: { height: "10px" },
                      }}
                      name="email"
                      as={TextField}
                      placeholder="Enter Email"
                    />
                    <DivErrorMessage name="email" component="div" />
                  </Grid>
                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <ContentTypography>Gender</ContentTypography>
                    <Field type="radio" name="gender" value="male" as={Radio} />
                    Male
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      as={Radio}
                    />
                    Female
                    <DivErrorMessage name="gender" component="div" />
                  </Grid>
                  <Grid item lg={2} md={2.6} sm={3.6} xs={10}>
                    <ContentTypography>Date of Birth</ContentTypography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Basic date picker"
                          name="dateOfBirth"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <DivErrorMessage name="dateOfBirth" component="div" />
                  </Grid>
                </Grid>
              </Card>
              <BasicTypography>Employment Details</BasicTypography>
              <Card>
                <Grid container m={2}>
                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <ContentTypography>Blood Group</ContentTypography>
                    <Field
                      name="bloodGroup"
                      as={TextField}
                      placeholder="Enter Blood Group"
                      inputProps={{
                        style: { height: "10px" },
                      }}
                    />
                    <DivErrorMessage name="bloodGroup" component="div" />
                  </Grid>
                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <ContentTypography>Department</ContentTypography>
                    <Field
                      name="department"
                      as={TextField}
                      placeholder="Enter Department"
                      inputProps={{
                        style: { height: "10px" },
                      }}
                    />
                    <DivErrorMessage name="department" component="div" />
                  </Grid>
                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <ContentTypography>Designation</ContentTypography>
                    <Field
                      name="designation"
                      as={TextField}
                      placeholder="Enter Designation"
                      inputProps={{
                        style: { height: "10px" },
                      }}
                    />
                    <DivErrorMessage name="designation" component="div" />
                  </Grid>
                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <ContentTypography>Phone</ContentTypography>
                    <Field
                      name="phone"
                      as={TextField}
                      placeholder="Enter Phone"
                      inputProps={{
                        style: { height: "10px" },
                      }}
                    />
                    <DivErrorMessage name="phone" component="div" />
                  </Grid>
                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <ContentTypography>Level</ContentTypography>
                    <Field
                      name="level"
                      as={TextField}
                      placeholder="Enter Level"
                      inputProps={{
                        style: { height: "10px" },
                      }}
                    />
                    <DivErrorMessage name="level" component="div" />
                  </Grid>

                  <Grid item lg={4} md={4} sm={5} xs={12}>
                    <Link to={"tableComponent"}>
                      <SubmitButton variant="contained" type="submit"
                     disabled={!isValid || isFormValid}
                      onClick={() => setIsFormValid(!isValid)}>
                        Submit
                      </SubmitButton>
                    </Link>
                  </Grid>
                </Grid>
              </Card>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Coming Soon
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Coming Soon
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              Coming Soon
            </CustomTabPanel>
          </Box>
        </Form>
        )} 
      </Formik>
    </Card>
  );
}
