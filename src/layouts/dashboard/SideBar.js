import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useSettings from "../../hooks/useSettings";
import logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import AntSwitch from "../../components/AntSwitch";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOut } from "../../redux/slices/auth";
import { FetchUserProfile } from "../../redux/slices/auth";

const SideBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = window.location.pathname;
  const { onToggleMode } = useSettings();
  const [selected, setSelected] = useState(location);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, []);

  const getPath = (index) => {
    switch (index) {
      case 0:
        return "profile";

      case 1:
        return "settings";

      default:
        break;
    }
  };
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    if (e === 2) {
      return dispatch(LogoutOut());
    }
    navigate(`/${getPath(e)}`);
    setAnchorEl(null);
  };

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0, 0.25)",
        height: "100vh",
        width: "100px",
      }}
    >
      <Stack
        alignItems={"center"}
        direction={"column"}
        justifyContent="space-between"
        sx={{
          height: "100%",
        }}
        spacing={3}
      >
        <Stack
          alignItems={"center"}
          direction={"column"}
          sx={{
            width: "100%",
          }}
          spacing={3}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <img src={logo} alt="Chat App Logo" />
          </Box>
          <Stack spacing={3}>
            {Nav_Buttons.map((item) => (
              <Stack key={item.index}>
                {item.index === 3 && (
                  <Divider
                    sx={{
                      marginBottom: "8px",
                    }}
                  ></Divider>
                )}
                <Box
                  sx={{
                    backgroundColor:
                      selected === item.link && theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  key={item.index}
                  onClick={() => setSelected(item.link)}
                >
                  <Link to={item.link}>
                    <IconButton
                      sx={{
                        color: selected === item.link && "#fff",
                        width: "max-content",
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </Link>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack
          alignItems={"center"}
          direction={"column"}
          justifyContent="flex-end"
          sx={{
            height: "100%",
          }}
          spacing={3}
        >
          <AntSwitch
            onChange={() => onToggleMode()}
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
          />
          <Tooltip title="Account settings" arrow={true}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={user?.avatar}></Avatar>
            </IconButton>
          </Tooltip>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 25,
                height: 25,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 68,
                left: -3,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(50%) rotate(-45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "left", vertical: "bottom" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {Profile_Menu.map((el, i) => (
            <MenuItem key={i} onClick={() => handleClose(i)}>
              <ListItemIcon>{el.icon}</ListItemIcon>
              {el.title}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Box>
  );
};

export default SideBar;
