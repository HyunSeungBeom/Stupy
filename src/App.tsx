/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import React from 'react';
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
            position: 'absolute',
            background: `url(${BackgroundImage})`,
            alignItems: 'center',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            top: '0',
            right: '0',
            backgroundPosition: 'top right',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div>
            <BrowserRouter>
              <RecoilRoot>
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
              </RecoilRoot>
            </BrowserRouter>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: '211px',
            boxSizing: 'border-box',
          }}
        >
          <BrowserRouter>
            <RecoilRoot>
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
            </RecoilRoot>
          </BrowserRouter>
        </div>
      </MobileView>
    </>
  );
}

export default App;
