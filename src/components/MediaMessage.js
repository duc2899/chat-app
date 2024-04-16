import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  useTheme,
  Tab,
  Tabs,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/slices/app";
import {
  CaretLeft,
  LinkSimple,
  FileDoc,
  FileXls,
  FilePdf,
  DownloadSimple,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import { SHARED_DOCS, SHARED_LINKS } from "../data";
import { Link } from "react-router-dom";

const MediaMessage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const TypeDoc = ({ type }) => {
    return (
      <Stack
        sx={{
          borderRadius: "10px",
        }}
        p={1}
      >
        {(() => {
          switch (type) {
            case "WORD":
              return <FileDoc size={32} color="#8EDFF9"></FileDoc>;
            case "EXCEL":
              return <FileXls size={32} color="greenYellow"></FileXls>;
            case "PDF":
              return <FilePdf size={32} color="red"></FilePdf>;
            default:
              return <div>Hll</div>;
          }
        })()}
      </Stack>
    );
  };
  return (
    <Box
      sx={{
        width: 340,
        height: "100vh",
      }}
    >
      <Stack
        sx={{
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{
              p: 2,
              paddingBottom: 3,
              height: "100%",
            }}
            direction={"row"}
            alignItems={"center"}
            spacing={3}
          >
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("CONTACT"));
              }}
            >
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Media, links and docs</Typography>
          </Stack>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            padding: "24px",
            overflowY: "scroll",
          }}
          spacing={3}
        >
          {(() => {
            switch (value) {
              case 0:
                //Images
                return (
                  <Grid container spacing={2}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Grid item xs={4} key={i}>
                        <img src={faker.image.avatar()} alt="fe"></img>
                      </Grid>
                    ))}
                  </Grid>
                );
              //   Links
              case 1:
                return SHARED_LINKS.map((el, i) => (
                  <Box
                    p={2}
                    key={i}
                    sx={{
                      backgroundColor: theme.palette.background.default,
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      display: "flex",
                      gap: "10px",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                    component={Link}
                    to={"https://www.youtube.com"}
                  >
                    <Stack
                      sx={{
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        borderRadius: "10px",
                      }}
                      p={1}
                    >
                      <LinkSimple
                        size={32}
                        color={theme.palette.text.primary}
                      />
                    </Stack>
                    <Stack>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.text.primary,
                          fontSize: "12px",
                        }}
                      >
                        https://codingmonk.in/blogs
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: "12px",
                        }}
                      >
                        codingmonk.in
                      </Typography>
                    </Stack>
                  </Box>
                ));
              // Docs
              case 2:
                return SHARED_DOCS.map((el, i) => (
                  <Box
                    p={2}
                    key={i}
                    sx={{
                      backgroundColor: theme.palette.background.default,
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      display: "flex",
                      gap: "10px",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      sx={{
                        width: "100%"
                      }}
                    >
                      <Stack direction={"row"} alignItems={"center"}>
                        <TypeDoc type={el.doctype}></TypeDoc>
                        <Stack>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: theme.palette.text.primary,
                              fontSize: "12px",
                            }}
                          >
                            {el.filename}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack>
                        <IconButton>
                          <DownloadSimple />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Box>
                ));

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};
export default MediaMessage;
