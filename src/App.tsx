import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import List from './screen/list';
import Login from './screen/login';
import Main from './screen/Main';
import './App.css';
import Mypage from './screen/mypage';
import Webcamchatting from './screen/webcamchatting';

const GlobalStyle = createGlobalStyle`

body{
  /* background: '#efefef'; */
}
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<List />} />
          <Route path="/kakao/login" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/webcamchatting" element={<Webcamchatting />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
