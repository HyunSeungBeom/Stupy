import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import List from './screen/List';
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
  document.addEventListener(
    'keydown',
    // eslint-disable-next-line func-names
    function (event) {
      if (event.code === 'Enter') {
        event.preventDefault();
      }
    },
    true,
  );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        minHeight: window.innerHeight,
      }}
    >
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<List />} />
          <Route path="/kakao/login" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/room/:id" element={<Webcamchatting />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
