import React from "react";
import Headers from "./Header";
import Footer from "./Footer";
import { Box, Stack, useTheme } from "@mui/material";
import Body from "./Body";

function Conversation(props) {
  const theme = useTheme();
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"} >
      {/* Header conversation */}
      <Headers></Headers>
      {/* Body conversation */}
      <Box
        width={"100%"}
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
        }}
      >
        <Body></Body>
      </Box>

      {/* Footer conversation */}
      <Footer></Footer>
    </Stack>
  );
}

export default Conversation;
