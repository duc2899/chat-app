import { Box, Grid, Popover, Stack, Tab, Tabs } from "@mui/material";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../socket";

function Stickers({ id, open, anchorEl, handleClose }) {
  const { userId } = useSelector((state) => state.auth);
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.app);
  const handelSendSticker = (value) => {
    if (value) {
      socket.emit("text_message", {
        message: value,
        conversation_id: room_id,
        from: userId,
        to: current_conversation.user_id,
        type: "STICKER",
      });
      handleClose();
    }
  };
  const StickersOp1 = () => {
    const elements = [];

    for (let index = 46964; index <= 46991; index++) {
      elements.push(
        <Grid item key={index}>
          <img
            onClick={() => handelSendSticker(index)}
            src={`https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=${index}&size=130&version=1`}
            alt={`sticker-${index}`}
            style={{ width: 50, height: 50, cursor: "pointer" }}
          />
        </Grid>
      );
    }
    return elements;
  };
  const StickersOp2 = () => {
    const elements = [];

    for (let index = 20060; index <= 20087; index++) {
      elements.push(
        <Grid item key={index}>
          <img
            onClick={() => handelSendSticker(index)}
            src={`https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=${index}&size=130&version=1`}
            alt={`sticker-${index}`}
            style={{ width: 50, height: 50, cursor: "pointer" }}
          />
        </Grid>
      );
    }
    return elements;
  };

  const [tab, setTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Popover
      id={id}
      title="Stickers"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 5,
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        width: "1000px",
        height: "700px",
      }}
    >
      <Box p={2}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          textColor="secondary"
          indicatorColor="secondary"
          centered
          sx={{
            mb: 2,
          }}
        >
          <Tab label="Méo mèo" />
          <Tab label="Quỳnh Aka" />
        </Tabs>

        <Grid
          container
          spacing={2}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {(() => {
            switch (tab) {
              case 0:
                return <StickersOp1></StickersOp1>;
              case 1:
                return <StickersOp2></StickersOp2>;
              default:
                return <h1>There no stickers</h1>;
            }
          })()}
        </Grid>
      </Box>
    </Popover>
  );
}

export default Stickers;
