export type GetRoomPayload = {
  params: {
    text?: string;
    sort?: 'latest’| ‘open’| ‘popularity';
  };
};

export type GetRoom = {
  roomId: string;
  title: string;
  usersNum: number;
  maxPeople: number;
  content: string;
  hashtags: string[];
  openKakao: string;
  image: string;
}[];
