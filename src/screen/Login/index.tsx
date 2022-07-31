import styled from 'styled-components';
import { ReactComponent as Logo } from 'src/assets/icons/socialLogin/logo.svg';
import { RATIO } from 'src/constants';

import SocialSignIn from './SocialSignIn';

function Login() {
  return (
    <PageBackground>
      <LogoBox>
        <Logo />
        <SocialSignBox>
          <SocialSignIn />
        </SocialSignBox>
      </LogoBox>
    </PageBackground>
  );
}

export default Login;

const PageBackground = styled.div`
  width: ${460 * RATIO}px;
  height: 100vh;
  max-width: 460px;
  background-color: white;
  align-items: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;
const LogoBox = styled.div`
  margin-top: 150px;
`;

const SocialSignBox = styled.div`
  margin-top: 200px;
`;
