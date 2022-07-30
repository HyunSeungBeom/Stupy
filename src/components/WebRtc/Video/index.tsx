import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  userid: string;
  stream: MediaStream;
  // eslint-disable-next-line react/require-default-props
  muted?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Video({ userid, stream, muted }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return (
    <Container>
      <VideoContainer
        className="webVideo"
        ref={ref}
        muted={isMuted}
        autoPlay
        playsInline
      />
      {/* <UserLabel>{userid}</UserLabel> */}
    </Container>
  );
}

export default Video;

const Container = styled.div`
  display: flex;
  padding-bottom: 4px;
`;

const VideoContainer = styled.video`
  background-color: black;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserLabel = styled.p`
  position: absolute;
  left: 0px;
`;
