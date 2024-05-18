import React from "react";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, IconButton, InputAdornment, Link, Stack } from "@mui/material";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../redux/slices/auth";
import RHFButtonSubmit from "../../components/hook-button/RHFButtonSubmit";
import { FetchUserProfile } from "../../redux/slices/app";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = React.useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address")
      .matches(/^(?!.*@[^,]*,)/),
    password: Yup.string().required("Password is required"),
  });
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(LoginUser(data));
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
      <Stack spacing={2}>
        {!!errors.message && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
      </Stack>
      <Stack>
        <RHFTextField name={"email"} label="Email"></RHFTextField>
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
      </Stack>
      <Stack
        width={"100%"}
        alignItems={"flex-end"}
        sx={{
          my: 2,
        }}
      >
        <Link
          component={RouterLink}
          to={"/auth/resetPassword"}
          variant="body2"
          color={"inherit"}
          underline="hover"
          sx={{
            cursor: "pointer",
          }}
        >
          Forgot Password
        </Link>
      </Stack>
      <RHFButtonSubmit text={"Login"}></RHFButtonSubmit>
    </FormProvider>
  );
};

export default LoginForm;
