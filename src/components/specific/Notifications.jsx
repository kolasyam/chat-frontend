// import React, { memo } from "react";
// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogTitle,
//   InputAdornment,
//   List,
//   ListItem,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { sampleNotifications } from "../../constants/sampleData";
// const Notifications = () => {
//   const friendRequestHandler=({_id,accept})=>{

//   }
//   return (
//     <Dialog open>
//       <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
//         <DialogTitle>Notifications</DialogTitle>
//         {sampleNotifications.length > 0 ? (
//           sampleNotifications.map((sender, _id) => (
//             <NotificationItem
//               sender={sender}
//               _id={_id}
//               handler={friendRequestHandler}
//               key={_id}
//             />
//           ))
//         ) : (
//           <Typography textAlign={"center"}> 0 notifications</Typography>
//         )}
//       </Stack>
//     </Dialog>
//   );
// };
// const NotificationItem = memo(({ sender, _id, handler }) => {
//   const {name,avatar}=sender;
//   console.log(name);
//   return (
//     <ListItem>
//     <Stack
//       direction={"row"}
//       alignItems={"center"}
//       spacing={"1rem"}
//       width={"100%"}
//     >
//       <Avatar />
//       <Typography
//         variant="body1"
//         sx={{
//           flexGlow: 1,
//           display: "-webkit-box",
//           WebkitLineClamp: 1,
//           WebkitBoxOrient: "vertical",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           width:'100%',
//         }}
//       >
//         {`${name} send you a friend request`}
//       </Typography>
//       <Stack direction={{
//         xs:"column",
//         sm:"row",
//       }}>
//         <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
//         <Button color="error" onClick={()=>handler({_id,accept:false})}>Reject</Button>
//       </Stack>
//     </Stack>
//   </ListItem>
//   );
// });
// export default Notifications;
// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogTitle,
//   ListItem,
//   Skeleton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import React, { memo } from "react";
// import { sampleNotifications } from "../../constants/sampleData";
// import {
//   useAcceptFriendRequestMutation,
//   useGetNotificationsQuery,
// } from "../../redux/api/api";
// import { useErrors } from "../../hooks/hook";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsNotification } from "../../redux/reducers/misc";
// import toast from "react-hot-toast";

// const Notifications = () => {
//   const { isNotification } = useSelector((state) => state.misc);
//   const dispatch = useDispatch();
//   const { isLoading, data, error, isError } = useGetNotificationsQuery();
//   const [acceptRequest] = useAcceptFriendRequestMutation();
//   const friendRequestHandler = async ({ _id, accept }) => {
//     dispatch(setIsNotification(false));
//     try {
//       const res = await acceptRequest({ requestId: _id, accept });
//       if (res.data?.success) {
//         console.log("Use SocketHere");
//         toast.success(res.data.message);
//       } else {
//         toast.error(res.data?.error || "Something went wrong");
//       }
//     } catch (error) {
//       toast.error( "Something went wrong");
//       console.log(error);
//     }
//   };
//   const closeHandler = () => dispatch(setIsNotification(false));
//   useErrors([{ error, isError }]);

//   return (
//     <Dialog open={isNotification} onClose={closeHandler}>
//       <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
//         <DialogTitle>Notifications</DialogTitle>
//         {isLoading ? (
//           <Skeleton />
//         ) : (
//           <>
//             {data?.allRequests.length > 0 ? (
//               data?.allRequests?.map(({ sender, _id }) => (
//                 <NotificationItem
//                   sender={sender}
//                   _id={_id}
//                   handler={friendRequestHandler}
//                   key={_id}
//                 />
//               ))
//             ) : (
//               <Typography textAlign={"center"}>0 notifications</Typography>
//             )}
//           </>
//         )}
//       </Stack>
//     </Dialog>
//   );
// };

// const NotificationItem = memo(({ sender, _id, handler }) => {
//   const { name, avatar } = sender;

//   return (
//     <ListItem>
//       <Stack
//         direction={"row"}
//         alignItems={"center"}
//         spacing={"1rem"}
//         width={"100%"}
//       >
//         <Avatar />
//         <Typography
//           variant="body1"
//           sx={{
//             flexGrow: 1,
//             display: "-webkit-box",
//             WebkitLineClamp: 1,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             width: "100%",
//           }}
//         >
//           {`${name} sent you a friend request`}
//         </Typography>
//         <Stack
//           direction={{
//             xs: "column",
//             sm: "row",
//           }}
//         >
//           <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
//           <Button color="error" onClick={() => handler({ _id, accept: false })}>
//             Reject
//           </Button>
//         </Stack>
//       </Stack>
//     </ListItem>
//   );
// });

// export default Notifications;

import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    // await acceptRequest("Accepting...",{requestId:_id,accept});
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.success) {
        console.log("Use SocketHere");
        toast.success(res.data.message);
      } else {
        console.log(error)
        toast.error(res.data?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const closeHandler = () => dispatch(setIsNotification(false));
  useErrors([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  if (!sender) {
    return null; // If sender is undefined, return null to avoid rendering
  }

  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;

