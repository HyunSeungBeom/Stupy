import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import List from './screen/list';
import Login from './screen/login';
import Main from './screen/main';

const GlobalStyle = createGlobalStyle`

body{
  background: white;
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
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
