import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import List from './screen/List';
import Login from './screen/Login';
import Main from './screen/Main';
import './App.css';
// eslint-disable-next-line import/order
import { BrowserView, MobileView } from 'react-device-detect';
import Setting from './screen/Setting';
// eslint-disable-next-line import/order
import BackgroundImage from 'src/assets/images/StupyBackground.svg';
import WebCamscreen from './screen/WebCamscreen';

const GlobalStyle = createGlobalStyle`

body{
  /* background: '#efefef'; */
}
`;

const localToken = localStorage.getItem('token');
function ProtectedRoute({ redirectPath = '/' }) {
  if (!localToken) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <>
      <BrowserView>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gray',
            height: '100vh',
            background: `url(${BackgroundImage})`,
            backgroundSize: 'cover',
          }}
        >
          <BrowserRouter>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/kakao/login" element={<Main />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/main" element={<Main />} />
                <Route path="/list" element={<List />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/room/:id" element={<WebCamscreen />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </BrowserView>
      <MobileView>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/kakao/login" element={<Main />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/main" element={<Main />} />
              <Route path="/list" element={<List />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/room/:id" element={<WebCamscreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MobileView>
    </>
  );
}

export default App;
