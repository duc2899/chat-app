import React from "react";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { UpdateSettingType } from "../../redux/slices/app";
import { CaretLeft, Fingerprint } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
const HelpPanel = () => {
  const theme = useTheme();
  const List = [
    {
      key: 0,
      title: "Help Center",
    },
    {
      key: 1,
      title: "Contact Us",
    },
    {
      key: 2,
      title: "Licenses",
    },
    {
      key: 3,
      title: "Terms and Privacy Policy",
    },
  ];
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <IconButton
          sx={{
            color: "currentColor",
          }}
          onClick={() => UpdateSettingType("SETTING")()}
        >
          <CaretLeft weight="bold" size={28}></CaretLeft>
        </IconButton>
        <Typography
          variant="subtitle2"
          fontSize={28}
          sx={{
            fontWeight: "bold",
          }}
        >
          Help
        </Typography>
      </Stack>
      <Stack
        width={"100%"}
        sx={{
          paddingTop: 3,
          paddingBottom: 4,
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack
          p={4}
          sx={{
            borderRadius: "50%",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Fingerprint
            size={70}
            color={theme.palette.common.white}
          ></Fingerprint>
        </Stack>
      </Stack>
      <Stack spacing={2} p={2}>
        {List.map(({ key, title }) => (
          <Stack key={key}>
            <Typography variant="subtitle2" fontSize={16} fontWeight={600}>
              {title}
            </Typography>
            {key !== List.length - 1 && (
              <Divider
                sx={{
                  paddingTop: "5px",
                }}
              ></Divider>
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default HelpPanel;
