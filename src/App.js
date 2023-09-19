import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import GetToken from "./pages/GetToken";
import ViewPost from "./pages/ViewPost";
import Root from "./components/Root";
import Profile from "./pages/Profile";
import UserPosts from "./components/UserPosts";
import UserLikedPosts from "./components/UserLikedPosts";
import EditProfile from "./pages/EditProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: "/post/:id", element: <ViewPost /> },

        {
          path: "/profile/:username",
          element: <Profile />,
          children: [
            { index: true, element: <UserPosts /> },
            {
              path: "likes",
              element: <UserLikedPosts />,
            },
            {
              path: "songs",
              element: <div>ouheruvheiurvhpieuhvpuhepuvheiuhvu</div>,
            },
          ],
        },
        { path: "/profile/edit", element: <EditProfile /> },
      ],
    },
    { path: "/welcome", element: <Welcome /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/get_token", element: <GetToken /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>;

  // return (
  //   <BrowserRouter>
  //     <Header />
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/welcome" element={<Welcome />} />
  //       <Route path="/post/:id" element={<ViewPost />} />
  //       <Route path="/get_token" element={<GetToken />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
