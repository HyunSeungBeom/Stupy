import styled from 'styled-components';
import { ReactComponent as Logo } from 'src/assets/icons/socialLogin/logo.svg';
import { ReactComponent as LogoLetter } from 'src/assets/icons/socialLogin/Stupyletter.svg';
import { ReactComponent as SmallLogin } from 'src/assets/icons/socialLogin/smallLogin.svg';
import { ReactComponent as BottomLetter } from 'src/assets/icons/socialLogin/bottomletter.svg';
import { RATIO } from 'src/constants';

import { SetBackGround } from 'src/components/Styled';
import SocialSignIn from './SocialSignIn';

function Login() {
  return (
    <SetBackGround>
      <PageBackground>
        <LogoBox>
          <Logo />
          <div>
            <LogoLetter />
          </div>
        </LogoBox>
        <SmallLoginBox>
          <SmallLogin />
        </SmallLoginBox>
        <SocialSignBox>
          <SocialSignIn />
        </SocialSignBox>
        <BottomLetter />
      </PageBackground>
    </SetBackGround>
  );
}

export default Login;

const PageBackground = styled.div`
  width: ${428 * RATIO}px;
  max-width: 428px;
  max-height: 1009px;
  background: #ff9052;
  align-items: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
`;
const LogoBox = styled.div`
  padding-top: 220px;
  box-sizing: border-box;
  height: ${602 * RATIO}px;
  max-height: 602px;
  border-radius: 0 0 40px 40px;
  background: white;
`;

const SocialSignBox = styled.div`
  margin-top: 46px;
  background: #ff9052;
  margin-bottom: 40px;
`;

const SmallLoginBox = styled.div`
  margin-top: 46px; ;
`;
