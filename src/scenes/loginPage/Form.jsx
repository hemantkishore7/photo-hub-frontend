import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Box } from "@mui/system";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleFormSubmit = async () => {};

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        handleBlur,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="firstName"
                  value={values.firstName}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="lastName"
                  value={values.lastName}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="location"
                  value={values.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="occupation"
                  value={values.occupation}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFile=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFile) =>
                      setFieldValue("picture", acceptedFile[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px solid ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover": { cursor: "pointer" },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add picture here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon/>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
                  label="Email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  error={
                    Boolean(touched.email) && Boolean(errors.email)
                  }
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                 <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                  error={
                    Boolean(touched.password) && Boolean(errors.password)
                  }
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
          </Box>

          {/* Button */}
          <Box>
            <Button fullWidth
            type="submit" 
            sx={{
                m:"2rem 0",
                p:"1rem",
                backgroundColor:palette.primary.main,
                color:palette.background.alt,
                "&:hover":{color:palette.primary.main}
            }}>
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
            onClick={()=>{
                setPageType(isLogin? "register" : "login")
                resetForm();
                }}
                sx={{
                    "&:hover":{
                        cursor:"pointer",
                        color:palette.primary.main
                    }
                }}
                textAlign="center">
              {isLogin? "Don't have account? Register" 
              : "Already you have account? Login"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
