import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import settingImage from "../../assets/Images/Call Service.png";
import SettingsPanel from "../../components/SettingComponent/SettingsPanel";
import NotificationsPanel from "../../components/SettingComponent/NotificationsPanel";
import PrivacyPanel from "../../components/SettingComponent/PrivacyComponents/PrivacyPanel";
import PrivacyCommonPanel from "../../components/SettingComponent/PrivacyComponents/PrivacyCommonPanel";
import BlockContactsPanel from "../../components/SettingComponent/PrivacyComponents/BlockContacts/BlockContactsPanel";
import SecurityPanel from "../../components/SettingComponent/SecurityPanel";
import HelpPanel from "../../components/SettingComponent/HelpPanel";
import RequestAccountPanel from "../../components/SettingComponent/RequestAccountPanel";
const Settings = () => {
  const theme = useTheme();
  const { settings } = useSelector((store) => store.app);
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
      }}
    >
      {/* Left Panel */}
      <Box
        sx={{
          overflowY: "scroll",
          height: "100vh",
          width: "560px",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          padding: "18px",
        }}
      >
        {settings?.open &&
          (() => {
            switch (settings?.type) {
              case "SETTING":
                return <SettingsPanel></SettingsPanel>;
              case "NOTIFICATION":
                return <NotificationsPanel></NotificationsPanel>;
              case "PRIVACY":
                return <PrivacyPanel></PrivacyPanel>;
              case "SECURITY":
                return <SecurityPanel></SecurityPanel>;
              case "HELP":
                return <HelpPanel></HelpPanel>;
              case "REQUESTACC":
                return <RequestAccountPanel></RequestAccountPanel>;
              case "LASTSEEN":
                return (
                  <PrivacyCommonPanel
                    tittle={"Last Seen"}
                    content={
                      "If you don’t share your Last Seen, you won’t be able to see other people’s Last Seen"
                    }
                  ></PrivacyCommonPanel>
                );
              case "PROFILEPHOTO":
                return (
                  <PrivacyCommonPanel
                    tittle={"Profile Photo"}
                    content={"Who can see my profile photo"}
                  ></PrivacyCommonPanel>
                );
              case "ABOUT":
                return (
                  <PrivacyCommonPanel
                    tittle={"About"}
                    content={"Who can see my about"}
                  ></PrivacyCommonPanel>
                );
              case "GROUPS":
                return (
                  <PrivacyCommonPanel
                    tittle={"Groups"}
                    content={"Who can add me to groups"}
                  ></PrivacyCommonPanel>
                );
              case "BLOCKCONTACTS":
                return <BlockContactsPanel></BlockContactsPanel>;
              default:
                return <div>Error</div>;
            }
          })()}
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack direction={"column"} alignItems={"center"}>
          <img src={settingImage} alt="settingImage"></img>
          <Typography
            variant="body2"
            sx={{
              display: "inline-flex",
              gap: "3px",
              fontWeight: "bold",
            }}
          >
            Select a conversation or start a{" "}
            <Typography
              color={theme.palette.primary.main}
              variant="body2"
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              new one
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Settings;
