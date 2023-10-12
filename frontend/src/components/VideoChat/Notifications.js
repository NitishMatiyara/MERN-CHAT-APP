import React, { useContext } from "react";
import { Button, Typography, Box } from "@material-ui/core";

import { SocketContext } from "../../Context/SocketProvider";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <Box sx={{ display: "flex" }}>
          <Typography variant="h5" style={{ color: "white" }}>
            {call.name} is calling...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => answerCall()}
          >
            Answer
          </Button>
        </Box>
      )}
    </>
  );
};

export default Notifications;
