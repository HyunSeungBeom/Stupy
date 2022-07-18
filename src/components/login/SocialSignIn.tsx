/* eslint-disable react/button-has-type */
import React from 'react';
import { ReactComponent as LoginButton } from 'src/assets/icons/socialLogin/loginbutton.svg';

function SocialSignIn() {
  const moveToSocialKakao = () => {
    window.location.replace(
      'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=968fe442549959a4ab2bb530f508c889&redirect_uri=http://54.180.141.17/main',
    );
  };
  return (
    <LoginButton onClick={moveToSocialKakao} style={{ cursor: 'pointer' }} />
  );
}

export default SocialSignIn;
