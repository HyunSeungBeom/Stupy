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
import Setting from './screen/Setting';
// eslint-disable-next-line import/order
import WebCam from './screen/WebCamscreen';

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
            <Route path="/room/:id" element={<WebCam />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
