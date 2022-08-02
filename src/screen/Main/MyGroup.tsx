// import React, { useState } from 'react';
import styled from 'styled-components';
import icoMaster from 'src/assets/icons/main/icoMaster.svg';
import imgSample from 'src/assets/images/imgSample.png';
import btnEnter from 'src/assets/icons/main/btnEnter.svg';
import { RATIO } from 'src/constants';

type Props = {
  id: string;
  isMaster: boolean;
  image: string;
  title: string;
  desc: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MyGroup({ id, isMaster, image, title, desc }: Props) {
  return (
    <Container
      style={{
        backgroundColor: 'gray',
        background: `url(${image || imgSample})`,
        backgroundSize: 'cover',
      }}
    >
      <div>
        {isMaster && <MasterIcon src={icoMaster} alt="" />}
        <GroupName>{title}</GroupName>
        <Description>{desc}</Description>
      </div>
      <EnterBtn src={btnEnter} alt="" />
    </Container>
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
