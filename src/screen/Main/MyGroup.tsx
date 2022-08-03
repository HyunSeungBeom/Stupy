/* eslint-disable no-alert */
// import React, { useState } from 'react';
import styled from 'styled-components';
import icoMaster from 'src/assets/icons/main/icoMaster.svg';
import imgSample from 'src/assets/images/imgSample.png';
import btnEnter from 'src/assets/icons/main/btnEnter.svg';
import { RATIO } from 'src/constants';
import { useMutation, useQueryClient } from 'react-query';
import { leaveRoomApi } from 'src/api/room';
import { ReactComponent as EditButton } from 'src/assets/icons/main/editbutton.svg';
import { GetMyRoom } from 'src/api/myRooms/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  item: GetMyRoom;
  openModal: ({
    myRoomData,
  }: {
    myRoomData: GetMyRoom | undefined;
  }) => () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MyGroup({ item, openModal }: Props) {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { roomId, isMaster, title, content } = item;
  const OutRoomCLick = () => {
    leaveRoom.mutate();
  };
  const leaveRoom = useMutation(() => leaveRoomApi(roomId), {
    onSuccess: () => {
      queryClient.invalidateQueries('myRoomData');
    },
  });

  const MyEnterRoom = () => {
    nav(`/room/${item.roomId}`);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div style={{ position: 'relative' }}>
      {isMaster && (
        <EditButtonBox>
          <EditButton
            style={{ cursor: 'pointer' }}
            onClick={openModal({ myRoomData: item })}
          />
        </EditButtonBox>
      )}
      <OutRoomButton onClick={OutRoomCLick}>방나가기</OutRoomButton>
      <Container
        style={{
          backgroundColor: 'gray',
          background: `url(${item.image || imgSample})`,
          backgroundSize: 'cover',
        }}
        onClick={MyEnterRoom}
      >
        <div>
          {isMaster && <MasterIcon src={icoMaster} alt="" />}

          <GroupName>{title}</GroupName>
          <Description>{content}</Description>
        </div>
        <EnterBtn src={btnEnter} alt="" />
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${196 * RATIO}px;
  max-height: 196px;
  padding: 26px 20px 20px;
  margin: 0px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.17);
  cursor: pointer;
`;

const MasterIcon = styled.img`
  width: 63px;
  height: 26px;
  margin-bottom: 10px;
`;

const GroupName = styled.div`
  font-size: 20px;
  color: white;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Description = styled.div`
  font-size: 15px;
  color: white;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 19px;
`;

const EnterBtn = styled.img`
  width: 83px;
  height: 24px;
  align-self: flex-end;
  cursor: pointer;
`;

const OutRoomButton = styled.div`
  text-align: center;
  position: absolute;
  width: 75px;
  height: 38px;
  right: 20px;
  top: 40px;
  background: #d9d9d99d 48%;

  cursor: pointer;
  color: white;
`;

const EditButtonBox = styled.div`
  position: absolute;
  right: 20px;
  top: 0px;
`;
