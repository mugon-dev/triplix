import { Route } from 'react-router-dom';
import NavBar from './pages/NavBar/NavBar';
import Banner from './pages/Banner/Banner';
import { createGlobalStyle } from 'styled-components';
import PickBar from './pages/PickBar/PickBar';
import Login from './pages/Login';
import Register from './pages/Register/Register';


const GlobalStyle = createGlobalStyle`
  body {
    color: #ffffff;
    background-color: #000000;
    font-family: Noto Sans KR;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <NavBar />
      <Route exact path="/" component={Banner} />
      <PickBar/>

    </div>
  );
}

export default App;
