export type GetMyRooms = {
  roomId: string;
  title: string;
  userNum: number;
  maxPeople: number;
  content: string;
  hashtags: string[];
  openKakao: string;
  image: string;
  isMaster: boolean;
}[];
