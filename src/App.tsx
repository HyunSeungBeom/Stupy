import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import List from './screen/List';
import Login from './screen/Login';
import Main from './screen/Main';
import './App.css';
import Webcamchatting from './screen/webcamchatting';
import Setting from './screen/Setting';
// eslint-disable-next-line import/order
import { io } from 'socket.io-client';

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
  const localToken = localStorage.getItem('token');
  const socket = io('http://stupy.shop', {
    // const socket = io('http://localhost:3001', {
    auth: {
      token: localToken,
    },
  });
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
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/list" element={<List />} />
          <Route path="/kakao/login" element={<Main />} />
          <Route path="/setting" element={<Setting />} />
          <Route
            path="/room/:id"
            element={<Webcamchatting socket={socket} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
