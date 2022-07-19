import { atom } from 'recoil';

export const sendSocket = atom<SocketIOClient.Socket | undefined>({
  key: 'sendSocket',
});
