export type GetUsers = {
  user: {
    _id: string;
    kakaouserId: string;
    userNick: string;
    email: string;
    profileImage: string;
    joinedRoomNum: number;
    __v: number;
  };
  message: string;
};
