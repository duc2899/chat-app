import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { MagnifyingGlass, X } from "phosphor-react";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Search, { SearchIconWrapper, StyledInputBase } from "../../../Search";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BLockContactDialog = ({ open, handleClose, listUsers }) => {
  const theme = useTheme();
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
          Block New Contact
        </Typography>
        <IconButton onClick={handleClose}>
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
        <Search
          sx={{
            mt: "10px",
          }}
        >
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6"></MagnifyingGlass>
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search...."></StyledInputBase>
        </Search>

        <List
          sx={{
            width: "100%",
          }}
        >
          {[1, 2, 3].map((i) => (
            <ListItem
              key={i}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                padding: 2,
              }}
            >
              <ListItem direction={"row"} alignItems={"center"} spacing={2}>
                <ListItemAvatar>
                  <Avatar src={faker.image.avatar()} sizes={50}></Avatar>
                </ListItemAvatar>
                <ListItemText direction={"column"}>
                  <Typography variant="subtitle2">
                    {" "}
                    {faker.name.fullName()}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={"rgba(124, 124, 125, 1)"}
                  >
                    {faker.word.conjunction()}
                  </Typography>
                </ListItemText>
              </ListItem>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default BLockContactDialog;
