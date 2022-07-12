/* eslint-disable react/button-has-type */
import React from 'react';
import { ReactComponent as KakaoIcon } from '../../assets/icons/socialLogin/KakaoIcon.svg';

function SocialSignIn() {
  const moveToSocialKakao = () => {
    window.location.replace(
      // 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=968fe442549959a4ab2bb530f508c889&redirect_uri=https://stupy.co.kr/main',
      // 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=968fe442549959a4ab2bb530f508c889&redirect_uri=http://localhost:3000/main',
      // 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=968fe442549959a4ab2bb530f508c889&redirect_uri=http://localhost:3000/main',
      'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=968fe442549959a4ab2bb530f508c889&redirect_uri=http://13.125.58.110:3000/main',
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
