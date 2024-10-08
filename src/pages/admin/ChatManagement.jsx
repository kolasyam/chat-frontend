import { Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
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
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
        <AvatarCard avatar={params.row.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/chats`,
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
  //   if (data) {
  //     setRows(
  //       data.chats.map((i) => ({
  //         ...i,
  //         id: i._id,
  //         avatar: i.avatar.map((i) => transformImage(i, 50)),
  //         members: i.members.map((i) => transformImage(i.avatar, 50)),
  //         creator: {
  //           name: i.creator.name,
  //           avatar: transformImage(i.creator.avatar, 50),
  //         },
  //       }))
  //     );
  //   }
  // }, [data]);
  useEffect(() => {
    if (data) {
      setRows(
        data.chats.map((i) => ({
          ...i,
          id: i._id,
  
          // Ensure avatar is an array before mapping
          avatar: Array.isArray(i.avatar) ? i.avatar.map((img) => transformImage(img, 50)) : [],
  
          // Ensure members is an array and each member has an avatar
          members: Array.isArray(i.members) 
            ? i.members.map((member) => transformImage(member.avatar, 50)) 
            : [],
  
          // Ensure creator exists and has the necessary properties
          creator: i.creator
            ? {
                name: i.creator.name,
                avatar: transformImage(i.creator.avatar, 50),
              }
            : { name: "", avatar: "" },
        }))
      );
    }
  }, [data]);
  
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <Table heading={"All Chats"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};
export default ChatManagement;
