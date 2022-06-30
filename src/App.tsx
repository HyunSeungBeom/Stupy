import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
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
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
