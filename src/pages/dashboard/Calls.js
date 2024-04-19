import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Search, {
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import {
  ArrowDownLeft,
  ArrowUpRight,
  MagnifyingGlass,
  Phone,
  PhoneCall,
  VideoCamera,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import { SimpleBarStyle } from "../../components/Scrollbar";
import CreateCallDialog from "../../sections/main/CreateCallDialog";

const data = [
  {
    id: faker.random.numeric(),
    name: faker.name.fullName(),
    img: faker.image.avatar(),
    isOutgoingCall: false,
    callTime: "Yesterday, 07:29",
    typeCall: "VIDEO",
    missedCall: false,
  },
  {
    id: faker.random.numeric(),
    name: faker.name.fullName(),
    img: faker.image.avatar(),
    isOutgoingCall: false,
    callTime: "Yesterday, 14:29",
    typeCall: "VIDEO",
    missedCall: true,
  },
  {
    id: faker.random.numeric(),
    name: faker.name.fullName(),
    img: faker.image.avatar(),
    isOutgoingCall: true,
    callTime: "Yesterday, 14:29",
    typeCall: "CALL",
    missedCall: false,
  },
];
const CallElement = ({
  name,
  img,
  isOutgoingCall,
  callTime,
  typeCall,
  missedCall,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.paper,
        borderRadius: 2,
        height: 80,
        width: "100%",
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2}>
          <Avatar src={img} sizes={"48"}></Avatar>
          <Stack>
            <Typography variant="subtitle2">{name}</Typography>
            <Stack direction={"row"} spacing={1}>
              {isOutgoingCall ? (
                <ArrowUpRight color="skyblue"></ArrowUpRight>
              ) : (
                <ArrowDownLeft color="skyblue"></ArrowDownLeft>
              )}
              <Typography variant="caption" color={"rgba(124, 124, 125, 1)"}>
                {callTime}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack>
          {typeCall === "VIDEO" ? (
            <VideoCamera
              size={"24"}
              color={
                missedCall ? "rgba(212, 94, 108, 1)" : "rgba(118, 212, 94, 1)"
              }
            ></VideoCamera>
          ) : (
            <Phone
              size={"24"}
              color={
                missedCall ? "rgba(212, 94, 108, 1)" : "rgba(118, 212, 94, 1)"
              }
            ></Phone>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
const Calls = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handelClose = () => {
    setOpen(false);
  };
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
        <Stack>
          <Typography variant="h4">Calls Log</Typography>
        </Stack>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6"></MagnifyingGlass>
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search...."></StyledInputBase>
        </Search>
        <Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2" color={theme.palette.primary.main}>
              Start new conversation
            </Typography>
            <IconButton onClick={() => setOpen(true)}>
              <Phone color={theme.palette.primary.main} fontSize={20}></Phone>
            </IconButton>
          </Stack>
          <Divider></Divider>
          <SimpleBarStyle
            timeout={500}
            clickOnTrack={false}
            sx={{
              paddingRight: "10px",
            }}
          >
            <Stack
              spacing={2}
              sx={{
                mt: 2,
              }}
            >
              {data.map((el) => (
                <CallElement key={el.id} {...el}></CallElement>
              ))}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
      <CreateCallDialog
        handelclose={handelClose}
        open={open}
        data={data}
      ></CreateCallDialog>
    </Box>
  );
};

export default Calls;
