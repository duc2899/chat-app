import React from "react";
import Headers from "./Header";
import Footer from "./Footer";
import { Box, Button, IconButton, Stack, useTheme } from "@mui/material";
import Body from "./Body";
import Search, { SearchIconWrapper, StyledInputBase } from "../Search";
import {
  CaretCircleDown,
  CaretCircleUp,
  MagnifyingGlass,
} from "phosphor-react";
import { useSelector } from "../../redux/store";
import { ToggleTextBox } from "../../redux/slices/app";
import { useDispatch } from "react-redux";

function Conversation(props) {
  const { searchTextBox } = useSelector((store) => store.app);
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* Header conversation */}
      <Headers></Headers>
      {/* TextBox search */}
      {searchTextBox.open && (
        <Stack
          height={"72px"}
          p={2}
          sx={{
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25);",
            border: "1px solid #07070714",
          }}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6"></MagnifyingGlass>
            </SearchIconWrapper>
            <StyledInputBase
              sx={{
                width: "100%",
              }}
              placeholder="Search...."
            ></StyledInputBase>
          </Search>
          <IconButton disabled>
            <CaretCircleDown></CaretCircleDown>
          </IconButton>
          <IconButton disabled>
            <CaretCircleUp></CaretCircleUp>
          </IconButton>
          <Button onClick={() => dispatch(ToggleTextBox())}>Close</Button>
        </Stack>
      )}
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
