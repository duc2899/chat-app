import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  Radio,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { UpdateSettingType } from "../../../redux/slices/app";
import { CaretLeft } from "phosphor-react";
const PrivacyCommonPanel = ({ tittle, content }) => {
  const list = [
    {
      key: 0,
      title: "Everyone",
    },
    {
      key: 1,
      title: "My Contacts",
    },
    {
      key: 2,
      title: "Nobody",
    },
  ];
  const theme = useTheme();
  const [choose, setChoose] = React.useState(0);
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <IconButton
          sx={{
            color: "currentColor",
          }}
          onClick={() => UpdateSettingType("PRIVACY")()}
        >
          <CaretLeft weight="bold" size={28}></CaretLeft>
        </IconButton>
        <Typography
          component={"Span"}
          variant="subtitle2"
          fontSize={23}
          sx={{
            fontWeight: "bold",
          }}
        >
          {tittle}
        </Typography>
      </Stack>
      <Stack p={2}>
        <Typography
          variant="subtitle2"
          fontSize={12}
          color={theme.palette.primary.main}
        >
          {content}
        </Typography>
      </Stack>
      <Stack p={2} spacing={1}>
        {list.map(({ key, title }) => (
          <Stack key={key}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                cursor: "pointer",
              }}
              onClick={() => setChoose(key)}
            >
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignContent={"space-between"}
              >
                <Typography component={"Span"} variant="subtitle2">
                  {title}
                </Typography>
              </Stack>
              <Radio checked={key === choose}></Radio>
            </Stack>
            {key !== 2 && (
              <Divider
                sx={{
                  marginTop: "8px",
                }}
              />
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default PrivacyCommonPanel;
