export type WebRTCUser = {
  id: string;
  userid: string;
  stream: MediaStream;
};

export interface TOkenList {
  exp: number;
  sub: string;
}
