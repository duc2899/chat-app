import React from "react";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { Alert, Avatar, Button, Stack } from "@mui/material";
import { CloudArrowUp } from "phosphor-react";
import { styled } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile } from "../../redux/slices/auth";

const ProfileForm = ({ isEdit, setEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    about: user?.about,
    avatar: user?.avatar,
  };
  const LoginSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    about: Yup.string(),
    avatar: Yup.string(),
  });
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [imageUrl, setImageUrl] = React.useState("");
  const handelDropAvatar = React.useCallback(
    (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      // Đọc dữ liệu của file và cập nhật imageUrl
      reader.onload = () => {
        setImageUrl(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      setValue("avatarURL", file, { shouldValidate: true });
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    try {
      dispatch(UpdateUserProfile(data));
      setEdit(false);
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {!!errors.message && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
      </Stack>
      <Stack
        sx={{
          mb: 2,
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={3}
          sx={{
            mb: 5,
          }}
        >
          <Avatar
            src={imageUrl ? imageUrl : user?.avatar}
            alt="Preview"
            sx={{
              width: "140px",
              height: "140px",
            }}
          />

          <Button
            component="label"
            role={"button"}
            tabIndex={-1}
            variant="outlined"
            size="medium"
            startIcon={<CloudArrowUp></CloudArrowUp>}
          >
            Upload Avatar
            <VisuallyHiddenInput
              name="avatar"
              type="file"
              onChange={handelDropAvatar}
            />
          </Button>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            mb: 2,
          }}
        >
          <RHFTextField
            disabled={!isEdit}
            sx={{
              mb: 2,
            }}
            name={"firstName"}
            label="First Name"
          ></RHFTextField>
          <RHFTextField
            disabled={!isEdit}
            sx={{
              mb: 2,
            }}
            name={"lastName"}
            label="Last Name"
          ></RHFTextField>
        </Stack>
        <RHFTextField
          disabled={!isEdit}
          multiline
          rows={4}
          name={"about"}
          label="About"
          sx={{
            mb: 2,
          }}
        ></RHFTextField>
      </Stack>
      <Stack>
        {isEdit && (
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              color="error"
              size="large"
              variant="contained"
              onClick={() => setEdit(false)}
            >
              Cancel
            </Button>
            <Button
              color="inherit"
              size="large"
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
              Save
            </Button>
          </Stack>
        )}
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
