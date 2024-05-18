import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Navigate to="/app" />;
  }

  return (
    <>
      <Container
        sx={{
          mt: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="md"
      >
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
