import { Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import UploadPage from "./pages/Upload/UploadPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import NavBar from "./pages/NavBar/NavBar";
import UserPage from "./pages/UserDetail/UserPage";
import DetailPage from "./pages/MainArea/DetailPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "./store";

const GlobalStyle = createGlobalStyle`
  body {
    color: #ffffff;
    background-color: #000000;
    font-family: Noto Sans KR;
  }
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const logged = localStorage.getItem("Authorization");
    if (logged === null) {
      return;
    } else {
      dispatch(login());
    }
  }, []);

  return (
    <div>
      <NavBar />
      <GlobalStyle />

      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/upload" component={UploadPage} />

      {/* 테스트중 */}
      <Route exact path="/userpage" component={UserPage} />
    </div>
  );
}

export default App;
