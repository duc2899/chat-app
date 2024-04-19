import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Transition from "../../components/Transition";
import { X } from "phosphor-react";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../../components/hook-form/RHFTextField";
import RHFAutoCompleted from "../../components/hook-form/RHFAutoCompleted";
import { faker } from "@faker-js/faker";

const data = [
  { name: faker.name.firstName(), avatar: faker.image.avatar() },
  { name: faker.name.firstName(), avatar: faker.image.avatar() },
  { name: faker.name.firstName(), avatar: faker.image.avatar() },
];
const CreateGroupsDialog = ({ handelClose, open }) => {
  const CreateGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "Must have at least 2 members"),
  });
  const defaultValues = {
    title: "",
    members: [],
  };
  const methods = useForm({
    resolver: yupResolver(CreateGroupSchema),
    defaultValues,
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
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography fontSize={20} variant="subtitle2">
          Create A New Group
        </Typography>
        <IconButton onClick={handelClose}>
          <X></X>
        </IconButton>
      </DialogTitle>
      <Divider
        sx={{
          marginTop: "8px",
        }}
      ></Divider>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {!!errors.message && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}
          </Stack>
          <RHFTextField
            name={"title"}
            label="Title"
            sx={{
              mb: 2,
            }}
          ></RHFTextField>
          <RHFAutoCompleted
            name={"members"}
            label={"Members"}
            options={data.map((option) => option)}
            sx={{
              mb: 2,
            }}
          ></RHFAutoCompleted>
          <Stack width={"100%"}>
            <Button
              color="inherit"
              size="medium"
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "text.primary",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
                "&:hover": {
                  bgcolor: "text.primary",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                },
              }}
            >
              Create
            </Button>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupsDialog;
