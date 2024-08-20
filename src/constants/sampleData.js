export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Joe nick",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  // {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "3",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },  {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "4",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },
  // {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "5",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },
  // {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "6",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },
  // {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "7",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },
  // {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "8",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },
  // {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "9",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },
  // {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "10",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },
  // {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "11",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },
  // {
  //   avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  //   name: "Joe nick",
  //   _id: "12",
  //   groupChat: false,
  //   members: ["1", "2"],
  // },
];
export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Joe nick",
    _id: "2",
  },
];
export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Joe nick",
    },
    _id: "2",
  },
];
// export const sampleMessage = [
//   {
//     attachments: [
//       {
//         public_id: "asfjsdf",
//         url: "https://www.w3schools.com/howto/img_avatar.png",
//       },
//     ],
//     content: "message 1 content",
//     _id: "skdjfaskjffkjadsfjsakldfjaklsfj",
//     sender: {
//       _id: "user._id",
//       name: "charan 1",
//     },
//     chat: "chatId",
//     createdAt: "2024-02-12T10:41:30.630Z",
//   },
//   {
//     attachments: [
//       {
//         public_id: "asfjsdf 2",
//         url: "https://www.w3schools.com/howto/img_avatar.png",
//       },
//     ],
//     content: "message 2 content",
//     _id: "skdjfaskjfjdsafkljdfaklsfj",
//     sender: {
//       _id: "sjdfsfjklasdfasfdssaj",
//       name: "charan 2",
//     },
//     chat: "chatId",
//     createdAt: "2024-02-12T10:41:30.630Z",
//   },
// ];
export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "asfjsdf",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "message 1 content",
    _id: "skdjfaskjffkjadsfjsakldfjaklsfj",
    sender: {
      _id: "1", // Ensure this matches the user's _id
      name: "John Doe",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
  {
    attachments: [
      {
        public_id: "asfjsdf 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "message 2 content",
    _id: "sjdfsfjklsaj",
    sender: {
      _id: "sjdfsfjklsaj", // Ensure this matches the other user's _id
      name: "Joe nick",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John nick",
      _id: "2",
      username: "john_nick",
      friends: 20,
      groups: 25,
    },
  ],
  chats: [
    {
      name: "hgfgfgroup",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"}, {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"}],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "john doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "John group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: true,
      members: [{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"}, {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"}],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "john doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },

  ],
  messages:[
    {
      attachments: [
        {
          public_id: "asfjsdf",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "message 1 content",
      _id: "skdjfaskjffkjadsfjsakldfjaklsfj",
      sender: {
        avatar:"https://www.w3schools.com/howto/img_avatar.png", // Ensure this matches the user's _id
        name: "John Doe",
      },
      chat: "chatId",groupChat:false,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
      attachments: [
        {
          public_id: "asfjsdf 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "message 2 content",
      _id: "sjdfsfjklsaj",
      sender: {
        avatar:"https://www.w3schools.com/howto/img_avatar.png", // Ensure this matches the other user's _id
        name: "Joe nick",
      },
      chat: "chatId",groupChat:true,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ]
};
