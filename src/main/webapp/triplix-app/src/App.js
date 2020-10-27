import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import UploadPage from './pages/Upload/UploadPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import NavBar from './pages/NavBar/NavBar';
import button from './pages/NavBar/button';
import Qwer from './pages/NavBar/Qwer';
import SignIn from './pages/NavBar/SignIn';
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
