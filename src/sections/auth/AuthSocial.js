import { Divider, IconButton, List } from "@mui/material";
import { GithubLogo, GoogleLogo, Stack, TwitterLogo } from "phosphor-react";
import React from "react";

const AuthSocial = () => {
  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before, ::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OR
      </Divider>
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton>
          <GoogleLogo color="#DF3E30"></GoogleLogo>
        </IconButton>
        <IconButton>
          <GithubLogo></GithubLogo>
        </IconButton>
        <IconButton>
          <TwitterLogo color="#1C9CEA"></TwitterLogo>
        </IconButton>
      </List>
    </div>
  );
};

export default AuthSocial;
