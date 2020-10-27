import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import UploadPage from './pages/Upload/UploadPage';
import Home from './pages/Home';


const GlobalStyle = createGlobalStyle`
  body {
    color: #ffffff;
    background-color: #000000;
    font-family: Noto Sans KR;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/upload" component={UploadPage} />

    </div>
  );
}

export default App;
