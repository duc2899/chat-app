import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ProfileForm from "../../sections/settings/ProfileForm";
import { PencilSimple } from "phosphor-react";
const Profile = () => {
  const theme = useTheme();
  const [edit, setEdit] = useState(false);
  return (
    <Box
      sx={{
        position: "relative",
        width: 420,
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(248, 250, 255, 1)"
            : theme.palette.background.default,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        p={3}
        spacing={3}
        sx={{
          height: "100vh",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Profile</Typography>
          {!edit && (
            <IconButton onClick={() => setEdit(true)}>
              <PencilSimple size={32} />
            </IconButton>
          )}
        </Stack>
        <ProfileForm
          isEdit={edit}
          setEdit={(val) => setEdit(val)}
        ></ProfileForm>
      </Stack>
    </Box>
  );
};

export default Profile;
