// // import { Stack } from "@mui/material";
// // import React from "react";

// // const ChatItem = ({
// //   w = "100%",
// //   chats = [],
// //   chatId,
// //   onlineUsers = [],
// //   newMessagesAlert = [
// //     {
// //       chatId: "1",
// //       count: 0,
// //     },
// //   ],
// //   handleDeleteChat,
// // }) => {
// //   return (
// //     <Stack width={w} direction={"column"}>
// //       {chats?.map((data) => {
// //         return <div>sd</div>;
// //       })}
// //     </Stack>
// //   );
// // };

// // export default ChatItem;
// import React from "react";
// import { Link } from "../styles/StyledComponents";
// import { Box, Stack, Typography } from "@mui/material";

// const ChatItem = ({
//   avatar = [],
//   name,
//   _id,
//   groupChat = false,
//   sameSender,
//   isOnline,
//   newMessageAlert,
//   index = 0,
//   handleDeleteChatOpen,
// }) => {
//   return (
//     <Link
//       to={`/chat/${_id}`}
//       onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
//     >
//       <div
//         style={{
//           display: "flex",
//           gap: "1rem",
//           alignItems: "center",
//           padding: "1rem",
//           backgroundColor: sameSender ? "black" : "unset",
//           color: sameSender ? "white" : "unset",
//           position: "relative",
//         }}
//       >
//         {/* Avatar card */}
//         <Stack>
//           <Typography>{name}</Typography>
//           {newMessageAlert && (
//             <Typography>{newMessageAlert.count} New Message</Typography>
//           )}
//         </Stack>
//         {isOnline && (
//           <Box
//             sx={{
//               width: "10px",
//               height: "10px",
//               borderRadius: "50%",
//               backgroundColor: "green",
//               position: "absolute",
//               top: "50%",
//               right: "1rem",
//               transform: "translateY(-50%)",
//             }}
//           />
//         )}
//       </div>
//     </Link>
//   );
// };

// export default memo(ChatItem);
import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import {motion} from 'framer-motion'
const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
    sx={{
        padding:"0",
    }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
      initial={{opacity:0,y:"-100"}}
      whileInView={{opacity:1,y:0}}
      transition={{delay:index*0.1}}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar}/>
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);

