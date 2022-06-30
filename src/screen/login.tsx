import styled from 'styled-components';
import SocialSignIn from '../components/login/SocialSignIn';

function Login() {
  return (
    <PageBackground>
      <Logobox />
      <SocialSignBox>
        <SocialSignIn />
      </SocialSignBox>
    </PageBackground>
  );
}

export default Login;

const PageBackground = styled.div`
  align-items: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const Logobox = styled.div`
  display: flex;
  margin-top: 177px;
  margin-left: auto;
  margin-right: auto;
  width: 428px;
  height: 321px;
  background: yellow;
`;

const SocialSignBox = styled.div`
  margin-top: 200px;
`;
