import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
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
