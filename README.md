## Stupy 소개
<div align="center">
![image](https://github.com/user-attachments/assets/c1eef27d-d052-4673-b459-0327fe9d3516) 
</div>
<p fontWeight="bold">💡 Study + (P)eople + (Y)ou</p> 
<p>-Stupy는 온라인으로 같은 목표를 가진 사람들과 공부 할 수 있는 플랫폼입니다.</p>
<p>-여럿이서 공부할 수 있는 환경을 만들고, 같은 공부를 할 수 있는 커뮤니티를 만드는 장입니다.</p>



## 📚 기술스택
<div align="center">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white"/>
<img src="https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white"/>
<img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"/>
</div>

## 😃 서비스 아키택처
![image](https://github.com/user-attachments/assets/530d3a89-1562-479c-8194-062d760a52cd)

## 💡 담당 포지션
| 이름       | 포지션       | 개인 깃허브 or 이메일          | 담당                             |
| ---------- | ------------ | ------------------------------ |  ------------------------------ |
| **현승범** | `프론트엔드` | https://github.com/HyunSeungBeom| [부리더]<br/>1. CICD/무중단배포 <br/> 2. 소셜로그인<br/> 3. WebRTC<br/> 4. socket<br/> 5. 방생성 모달 <br/> 6. 방리스트 모달<br/> 7. 튜토리얼 
| **주재인** | `프론트엔드` | https://github.com/demian0721 | 1. 메인페이지<br/> 2. 방 리스트페이지<br/> 3. 환경설정페이지 <br/>4. 공통컴포넌트<br/>

## 🚀 프론트앤드 이슈 및 트러블슈팅
<details>
<summary> 문제 1</summary> </br>
👉 state 값이 바뀌는 경우에 리액트 특성상 페이지가 Redirect 되어서 소켓 아이디가 변하는 현상 발생. </br></br>
   ▶️ 페이지에 들어가기 전 유저가 보이지 않는 컴포넌트를 만들어 그 곳에서 socket 연결 후, 유저가
보이는 페이지로 가게끔 설정. 그러면 페이지에서 Redirect 되어도 소켓은 페이지 밖에 있으니 소켓
아이디가 변하지 않음!</br>

</details>
<details>
<summary>문제2</summary> </br>
👉 유저가 소켓에 비정상 접근을 시도했을 때(stupy.co.kr/room/@!#$!@!)로 직접 입력해서 들어올 때,
userId를 받지 못하고, socket에 계속 연결 시도하는 오류 발생 이로 인해, 서버 과부하  </br>
</br>
   ▶️ 로그인이 안된 유저인 경우 => ProtectedRoute를 이용 
유저가 토큰이 없고, 비정상 접근을 시도 했을 때( stupy.co.kr/!#@#)
토큰이 있는지 없는지 파악 후 없으면 redirect를 로그인창으로 시킴 </br>
   </br>
   ▶️  로그인이 된 유저인 경우 => socket이 null 값일 땐 socket을 직접 연결하는 것이 아니라 그 전에 beforesocket이라는
api를 통해 isSuccess 되면 socket연결 하게끔 설정 만약 beforesocket에서 에러가 나면 navigate를 통해
전 화면으로 돌아가게끔 설정!
   </details>
     
