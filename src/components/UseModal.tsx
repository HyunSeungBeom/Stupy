/* eslint-disable camelcase */
import { useCallback, useState } from 'react';
import { GetMyRoom } from 'src/api/myRooms/types';

export interface ModalStateProps {
  defaultOpen?: boolean;
}

export interface ModalState {
  readonly isOpen: boolean;
  myRoomData: GetMyRoom | undefined;
  open: ({ myRoomData }: { myRoomData: GetMyRoom | undefined }) => () => void;
  close: () => void;
  toggle: () => void;
}

export default function UseModal(props?: ModalStateProps): ModalState {
  const [isOpenState, setOpen] = useState(props?.defaultOpen || false);
  const [propsRoomdata, setPropsRoomdata] = useState<GetMyRoom | undefined>();
  return {
    isOpen: isOpenState,
    myRoomData: propsRoomdata,
    open: useCallback(
      ({ myRoomData }) =>
        () => {
          setOpen(true);
          setPropsRoomdata(myRoomData);
        },
      [],
    ),
    close: useCallback(() => {
      setOpen(false);
    }, []),
    toggle: useCallback(() => {
      setOpen((e) => !e);
    }, []),
  };
}
