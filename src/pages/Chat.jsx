// import React, {
//   Fragment,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import AppLayout from "../components/layout/AppLayout";
// import { IconButton, Skeleton, Stack } from "@mui/material";
// import { grayColor } from "../constants/color";
// import {
//   AttachFile as AttachFileIcon,
//   Send as SendIcon,
// } from "@mui/icons-material";
// import { InputBox } from "../components/styles/StyledComponents";
// import { orange } from "@mui/material/colors";
// import FileMenu from "../components/dialogs/FileMenu";
// import { sampleMessage } from "../constants/sampleData";
// import MessageComponent from "../components/shared/MessageComponent";
// import { getSocket } from "../socket";
// import { NEW_MESSAGE } from "../constants/events";
// import { useChatDetailsQuery } from "../redux/api/api";
// import { useSocketEvents } from "../hooks/hook";
// const user = {
//   _id: "sjdfsfjklsaj",
//   name: "Syam Manikanta kola",
// };
// const Chat = ({ chatId }) => {
//   const containerRef = useRef(null);
//   const socket = getSocket();
//   const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   console.log(messages);
//   const members = chatDetails?.data?.chat?.members;
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;
//     socket.emit(NEW_MESSAGE, { chatId, members, message });
//     // console.log(message);
//     setMessage("");
//   };
//   const newMessageListener = useCallback((data) => {
//     setMessages((prev) => [...prev, data.message]);
//   }, []);
//   const eventHandler = { [NEW_MESSAGE]: newMessageListener };
//   useSocketEvents(socket, eventHandler);
//   return chatDetails.isLoading ? (
//     <Skeleton />
//   ) : (
//     <Fragment>
//       <Stack
//         ref={containerRef}
//         boxSizing={"1rem"}
//         padding={"1rem"}
//         spacing={"1rem"}
//         bgcolor={grayColor}
//         height={"90vh"}
//         sx={{
//           overflowX: "hidden",
//           overflowY: "auto",
//         }}
//       >
//         {messages.map((i) => (
//           <MessageComponent key={i._id} message={i} user={user} />
//         ))}
//       </Stack>
//       <form
//         style={{
//           height: "10%",
//         }}
//         onSubmit={submitHandler}
//       >
//         <Stack
//           direction={"row"}
//           height={"100%"}
//           alignItems="center"
//           padding={"1rem"}
//           justifyContent="space-between"
//         >
//           <IconButton
//             sx={{
//               left: "1.5rem",
//               rotate: "30deg",
//             }}
//           >
//             <AttachFileIcon />
//           </IconButton>
//           <InputBox
//             placeholder="Type Message here.."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <IconButton
//             type="submit"
//             sx={{
//               rotate: "-30deg",
//               backgroundColor: "#ea7070",
//               color: "white",
//               marginLeft: "1rem",
//               padding: "0.5rem",
//               "&:hover": {
//                 bgcolor: "error.dark",
//               },
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </Stack>
//       </form>
//       <FileMenu />
//     </Fragment>
//   );
// };

// export default AppLayout()(Chat);

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import {
  BouncingSkeleton,
  InputBox,
} from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import MessageLoader from "../components/layout/MessageLoader";
// import { TypingLoader } from "../components/layout/Loaders.js";
const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];
  // console.log("oldMessages", oldMessages);
  // console.log(messages);
  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };
  const newMessageListener = useCallback(
    (data) => {
      if (data.chatId != chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId != chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId != chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );
  const alertListener = useCallback(
    (data) => {
      if (data.chatId!==chatId) return;
      const messageForAlert = {
        content:data.message,
        sender: {
          _id: "lkjdflksadjfklasjdf",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  useEffect(() => {
    // Register the event handler
    socket.on(ALERT, alertListener);
    socket.on(NEW_MESSAGE, newMessageListener);
    socket.on(START_TYPING, startTypingListener);
    socket.on(STOP_TYPING, stopTypingListener);
    // Cleanup function to remove the event handler
    return () => {
      socket.off(ALERT, alertListener);
      socket.off(NEW_MESSAGE, newMessageListener);
      socket.off(START_TYPING, startTypingListener);
      socket.off(STOP_TYPING, stopTypingListener);
    };
  }, [socket, newMessageListener, startTypingListener, stopTypingListener]);
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };
  useEffect(() => {
    socket.emit(CHAT_JOINED,{userId:user._id,members})
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage([]);
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED,{userId:user._id,members})
    };
  }, [chatId]);
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [messages]);
  useErrors(errors);
  const allMessages = [...oldMessages, ...messages];
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"1rem"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90vh"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* {!oldMessagesChunk.isLoading &&
          oldMessagesChunk.data?.messages.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))} */}
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
        {userTyping && <MessageLoader />}

        <div ref={bottomRef} />
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          alignItems="center"
          padding={"0.5rem"}
          justifyContent="space-between"
        >
          <IconButton
            sx={{
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message here.."
            value={message}
            onChange={messageOnChange}
          />
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: "#ea7070",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
