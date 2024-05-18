import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const RHFButtonSubmit = ({ text }) => {
  const { isLoading } = useSelector((store) => store.auth);
  return (
    <Button
      disabled={isLoading}
      fullWidth
      color="inherit"
      size="large"
      type="submit"
      variant="contained"
      loadingIndicator={<CircularProgress color="inherit" size={16} />}
      sx={{
        bgcolor: "text.primary",
        color: (theme) =>
          theme.palette.mode === "light" ? "common.white" : "grey.800",
        "&:hover": {
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
        },
        mt: 1,
      }}
    >
      {isLoading ? (
        <CircularProgress
          size={30}
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          }}
        />
      ) : (
        text
      )}
    </Button>
  );
};

export default RHFButtonSubmit;
