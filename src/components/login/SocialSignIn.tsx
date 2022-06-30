/* eslint-disable react/button-has-type */
import React from 'react';
import { ReactComponent as KakaoIcon } from '../../assets/icons/socialLogin/KakaoIcon.svg';

function SocialSignIn() {
  const moveToSocialKakao = () => {
    window.location.replace(
      'https://kauth.kakao.com/oauth/authorize?client_id=968fe442549959a4ab2bb530f508c889&redirect_uri=https://studypeople.site/oauth&response_type=code',
    );
  };
  return (
    <button onClick={moveToSocialKakao}>
      <KakaoIcon />
      카카오로 시작하기
    </button>
  );
}

export default SocialSignIn;
