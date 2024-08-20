// import { Menu, Stack } from "@mui/material";
// import React from "react";
// import { useSelector } from "react-redux";
// import { setIsDeleteMenu } from "../../redux/reducers/misc";

// const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
//   const { isDeleteMenu } = useSelector((state) => state.misc);

//   const closeHandler = () => {
//     dispatch(setIsDeleteMenu(false));
//   };
//   return (
//     <Menu
//       open={isDeleteMenu}
//       onClose={closeHandler}
//       anchorE1={deleteMenuAnchor.current}
//     >
//       <Stack
//         sx={{
//           width: "10rem",
//           padding: "0.5rem",
//           cursor: "pointer",
//         }}
//         direction={"row"}
//         alignItems={"center"}
//         spacing={"0.5rem"}
//       >
//         Delete
//       </Stack>
//     </Menu>
//   );
// };

// export default DeleteChatMenu;

import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );
  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteChatMutation
  );
  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );
  const isGroup = selectedDeleteChat.groupChat;
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };
  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving group...", selectedDeleteChat.chatId);
  };
  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
  };
  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current} // Correct anchor element reference
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Positioning at bottom left
      transformOrigin={{ vertical: "center", horizontal: "center" }} // Adjusting transformation origin
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon /> <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <DeleteIcon />
            <Typography>Delete Chat</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
