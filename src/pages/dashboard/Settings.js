import React from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import SettingsPanel from "../../components/SettingComponent/SettingsPanel";
import NotificationsPanel from "../../components/SettingComponent/NotificationsPanel";
import PrivacyPanel from "../../components/SettingComponent/PrivacyComponents/PrivacyPanel";
import PrivacyCommonPanel from "../../components/SettingComponent/PrivacyComponents/PrivacyCommonPanel";
import BlockContactsPanel from "../../components/SettingComponent/PrivacyComponents/BlockContacts/BlockContactsPanel";
import SecurityPanel from "../../components/SettingComponent/SecurityPanel";
import HelpPanel from "../../components/SettingComponent/HelpPanel";
import RequestAccountPanel from "../../components/SettingComponent/RequestAccountPanel";
import ConversationStart from "../../components/ConversationStart";
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
      <ConversationStart></ConversationStart>
    </Stack>
  );
};

export default Settings;
