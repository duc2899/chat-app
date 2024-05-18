import React from "react";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeSlash } from "phosphor-react";
import { Alert, IconButton, InputAdornment, List } from "@mui/material";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../redux/slices/auth";
import RHFButtonSubmit from "../../components/hook-button/RHFButtonSubmit";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = React.useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address")
      .matches(/^(?!.*@[^,]*,)/),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Please enter a password between 5 and 10 characters long")
      .max(10, "Please enter a password between 5 and 10 characters long"),
  });
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(RegisterUser(data));
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <List spacing={2}>
        {!!errors.message && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
      </List>
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <RHFTextField name={"firstName"} label="First Name"></RHFTextField>
        <RHFTextField name={"lastName"} label="Last Name"></RHFTextField>
      </List>
      <RHFTextField
        sx={{
          marginTop: "20px",
        }}
        name={"email"}
        label="Email"
      ></RHFTextField>
      <RHFTextField
        sx={{
          marginTop: "20px",
        }}
        name={"password"}
        label="Password"
        type={showPass ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPass(!showPass)}>
                {showPass ? <Eye /> : <EyeSlash />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></RHFTextField>
      <RHFButtonSubmit text={"Register"}></RHFButtonSubmit>
    </FormProvider>
  );
};

export default RegisterForm;
