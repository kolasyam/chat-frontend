// import React from "react";
// import {
//   Avatar,
//   Button,
//   Container,
//   IconButton,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import {useDispatch, useSelector} from 'react-redux'
// import { bgGradient } from "../../constants/color";
// import { useInputValidation } from "6pp";
// import { Navigate } from "react-router-dom";
// import { adminLogin } from "../../redux/thunks/admin";
// // const isAdmin=true;
// const AdminLogin = () => {
//   const {isAdmin}=useSelector(state=>state.auth);
//   const dispatch=useDispatch();

//   const secretKey = useInputValidation("");
//   const submitHandler = () => {
//     e.preventDefault();
//     console.log("submit");
//     dispatch(adminLogin(secretKey.value))
//   };
//   if(isAdmin) return <Navigate to="/admin/dashboard"/>;
//   return (
//     <div
//       style={{
//         backgroundImage: bgGradient,
//       }}
//     >
//       <Container
//         component={"main"}
//         maxWidth="xs"
//         sx={{
//           height: "100vh",
//           display: "flex",
//           jusitfyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h5">Admin Login</Typography>
//           <form
//             style={{
//               width: "100%",
//               marginTop: "1rem",
//             }}
//             onSubmit={submitHandler}
//           >
//             <TextField
//               required
//               fullWidth
//               label="Secret Key"
//               type="password"
//               margin="normal"
//               variant="outlined"
//               value={secretKey.value}
//               onChange={secretKey.changeHandler}
//             />
//             <Button
//               sx={{ marginTop: "1rem" }}
//               variant="contained"
//               color="primary"
//               type="submit"
//               fullWidth
//             >
//               Login
//             </Button>
//           </form>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useEffect } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bgGradient } from "../../constants/color";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  const { isAdmin, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };
  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loader}
            >
              {loader ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;

// import React, { useEffect } from "react";
// import {
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { bgGradient } from "../../constants/color";
// import { useInputValidation } from "6pp";
// import { adminLogin } from "../../redux/thunks/admin";
// import { Navigate } from "react-router-dom";

// const AdminLogin = () => {
//   const { isAdmin, loader } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const secretKey = useInputValidation("");
//   const [shouldRedirect, setShouldRedirect] = React.useState(false);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(adminLogin(secretKey.value)).then((action) => {
//       if (action.type === "admin/login/fulfilled") {
//         // Show success toast and delay the redirect
//         setTimeout(() => {
//           setShouldRedirect(true);
//         }, 1000); // Adjust delay as needed
//       }
//     });
//   };

//   useEffect(() => {
//     if (isAdmin) {
//       setShouldRedirect(true);
//     }
//   }, [isAdmin]);

//   if (shouldRedirect) return <Navigate to="/admin/dashboard" />;

//   return (
//     <div
//       style={{
//         backgroundImage: bgGradient,
//       }}
//     >
//       <Container
//         component={"main"}
//         maxWidth="xs"
//         sx={{
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h5">Admin Login</Typography>
//           <form
//             style={{
//               width: "100%",
//               marginTop: "1rem",
//             }}
//             onSubmit={submitHandler}
//           >
//             <TextField
//               required
//               fullWidth
//               label="Secret Key"
//               type="password"
//               margin="normal"
//               variant="outlined"
//               value={secretKey.value}
//               onChange={secretKey.changeHandler}
//             />
//             <Button
//               sx={{ marginTop: "1rem" }}
//               variant="contained"
//               color="primary"
//               type="submit"
//               fullWidth
//               disabled={loader}
//             >
//               {loader ? <CircularProgress size={24} /> : "Login"}
//             </Button>
//           </form>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default AdminLogin;
