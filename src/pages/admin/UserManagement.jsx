import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Skeleton } from "@mui/material";
import AvatarCard from "../../components/shared/AvatarCard";

import { dashboardData } from "../../constants/sampleData";
import { transformImage } from "../../lib/features";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  // {
  //   field: "avatar",
  //   headerName: "Avatar",
  //   headerClassName: "table-header",
  //   width: 150,
  //   renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  // },
  // {
  //   field: "avatar",
  //   headerName: "Avatar",
  //   headerClassName: "table-header",
  //   width: 150,
  //   renderCell: (params) => {
  //     return <AvatarCard avatar={params.row.avatar} />;
  //   },
  // },
  // {
  //   field: "avatar",
  //   headerName: "Avatar",
  //   headerClassName: "table-header",
  //   width: 150,
  //   renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  // },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];
const UserManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "dashboard-users"
  );
  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  const [rows, setRows] = useState([]);
  // useEffect(() => {
  //   if(data){
  //     // setRows(
  //     //   data.users.map((i) => ({
  //     //     ...i,
  //     //     id: i._id,
  //     //     // avatar: transformImage(i.avatar, 50),
  //     //     avatar: i.avatar.map((i) => transformImage(i, 50)),
  //     //   }))
  //     // );
  //     setRows(
  //       data.chats.map((i) => ({
  //         ...i,
  //         id: i._id,
  //         avatar: i.avatar.map((i) => transformImage(i, 50)),
  //       }))
  //     );
  //   }
  // }, [data]);
  // useEffect(() => {
  //   if (data) {
  //     setRows(
  //       data.chats.map((i) => ({
  //         ...i,
  //         id: i._id,
  //         // Ensure avatar exists and is an array before mapping
  //         avatar: Array.isArray(i.avatar) ? i.avatar.map((img) => transformImage(img, 50)) : [],
  //       }))
  //     );
  //   }
  // }, [data]);
  
  useEffect(() => { 
    if (data) {
// Check the data
      setRows(
        data.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar || "/path/to/default-avatar.png", 50),
        }))
      );
    }
  }, [data]);
// useEffect(() => {
//   if (data) {
//     setRows(
//       data.chats.map((i) => ({
//         ...i,
//         id: i._id,

//         // Ensure avatar exists and is an array before mapping
//         avatar: Array.isArray(i.avatar) ? i.avatar.map((img) => transformImage(img, 50)) : [],
//       }))
//     );
//   }
// }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <Table heading={"All Users"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
