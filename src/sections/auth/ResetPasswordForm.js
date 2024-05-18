import React from "react";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Stack } from "@mui/material";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "../../redux/slices/auth";
import RHFButtonSubmit from "../../components/hook-button/RHFButtonSubmit";
const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address")
      .matches(/^(?!.*@[^,]*,)/),
  });
  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(ForgotPassword(data));
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
      <RHFTextField name={"email"} label="Email"></RHFTextField>
      <RHFButtonSubmit text={"Submit"}></RHFButtonSubmit>
    </FormProvider>
  );
};

export default ResetPasswordForm;
