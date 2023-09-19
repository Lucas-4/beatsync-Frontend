import Navigation from "../components/Navigation";
import Main from "../components/Main";
import Header from "../components/Header";
function Login() {
  return (
    <div className="app">
      <Header />
      <div className="main-nav-wrapper">
        <Navigation />
        <Main>
          <h1>Login</h1>
        </Main>
      </div>
    </div>
  );
}

export default Login;
