import Header from "./Header";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
function Root(props) {
  return (
    <>
      <Header />
      <Navigation />
      <Outlet />
    </>
  );
}

export default Root;
