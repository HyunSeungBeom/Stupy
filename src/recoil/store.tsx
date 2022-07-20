import { atom } from 'recoil';

export const sendSocket = atom<SocketIOClient.Socket>({
  key: 'sendSocket',
  default: undefined,
});
