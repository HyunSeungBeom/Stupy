/* eslint-disable react/button-has-type */
import React from 'react';
import { ReactComponent as LoginButton } from 'src/assets/icons/socialLogin/loginbutton.svg';
import { ReactComponent as NaverLoginButton } from 'src/assets/icons/socialLogin/NaverIcon.svg';

function SocialSignIn() {
  const moveToSocialKakao = () => {
    window.location.replace(
      'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=968fe442549959a4ab2bb530f508c889&redirect_uri=https://stupy.shop/main',
    );
  };

  const moveToSocialNaver = () => {
    window.location.replace(
      'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=iq4Y1nFcUpuQ9_Tpmtb6&state=STATE_STRING&redirect_uri=https://stupy.shop/naverlogin',
    );
  };
  return (
    <>
      <div>
        <LoginButton
          onClick={moveToSocialKakao}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div style={{ marginTop: '12px' }}>
        <NaverLoginButton
          onClick={moveToSocialNaver}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </>
  );
}

export default SocialSignIn;
