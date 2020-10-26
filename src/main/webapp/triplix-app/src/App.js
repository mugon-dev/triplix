import { Route } from 'react-router-dom';
import NavBar from './pages/NavBar/NavBar';
import Banner from './pages/Banner/Banner';
import { createGlobalStyle } from 'styled-components';

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
      <NavBar/>
      <Route exact path="/" component={Banner} />
    </div>
  );
}

export default App;
