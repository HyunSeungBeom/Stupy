import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  margin: 5px;
`;

const VideoContainer = styled.video`
  background-color: black;
`;

const UserLabel = styled.p`
  position: absolute;
  left: 0px;
`;

interface Props {
  userid: string;
  stream: MediaStream;
  // eslint-disable-next-line react/require-default-props
  muted?: boolean;
}

function Video({ userid, stream, muted }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return (
    <Container>
      <VideoContainer ref={ref} muted={isMuted} autoPlay />
      {/* <UserLabel>{userid}</UserLabel> */}
    </Container>
  );
}

export default Video;
