import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { useDispatch, useSelector } from "react-redux";
// import LayoutLoader from "./components/layout/Loaders";
import { LayoutLoader } from "./components/layout/Loaders";
import Dashboard from "./pages/admin/Dashboard";
// import AdminLogin from "./pages/admin/AdminLogin";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
import axios from "axios";
import { server } from "./constants/config";
import { Toaster } from "react-hot-toast";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { SocketProvider } from "./socket";
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

// let user = true;
const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/chat/:chatId" element={<Chat></Chat>}></Route>
            <Route path="/groups" element={<Groups></Groups>}></Route>
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          ></Route>
          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/users" element={<UserManagement />}></Route>
          <Route path="/admin/chats" element={<ChatManagement />}></Route>
          <Route path="/admin/messages" element={<MessageManagement />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
