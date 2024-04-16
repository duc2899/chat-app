import React from "react";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeSlash } from "phosphor-react";
import { Alert, Button, IconButton, InputAdornment, List } from "@mui/material";
import RHFTextField from "../../components/hook-form/RHFTextField";
const NewPasswordForm = () => {
  const [showNewPass, setShowNewPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .min(5, "Please enter a password between 5 and 10 characters long")
      .max(10, "Please enter a password between 5 and 10 characters long"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Password must be match"
    ),
  });
  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
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
      <RHFTextField
        name={"newPassword"}
        label="New Password"
        type={showNewPass ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowNewPass(!showNewPass)}>
                {showNewPass ? <Eye /> : <EyeSlash />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></RHFTextField>
      <RHFTextField
        sx={{
          marginTop: "20px",
        }}
        name={"confirmPassword"}
        label="Confirm Password"
        type={showConfirmPass ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirmPass(!showConfirmPass)}>
                {showConfirmPass ? <Eye /> : <EyeSlash />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></RHFTextField>
      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "text.primary",
          marginTop: "20px",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Submit
      </Button>
    </FormProvider>
  );
};

export default NewPasswordForm;
