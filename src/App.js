import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import GetToken from "./pages/GetToken";
import ViewPost from "./pages/ViewPost";
import Root from "./components/Root";
import Profile from "./pages/Profile";
import UserPosts from "./components/UserPosts";
import UserLikedPosts from "./components/UserLikedPosts";
import EditProfile from "./pages/EditProfile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";

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
                            element: (
                                <div className="main-child">In Development</div>
                            ),
                        },
                    ],
                },
                { path: "/profile/edit", element: <EditProfile /> },
                {
                    path: "/profile/:username/followers",
                    element: <Followers />,
                },
                {
                    path: "/profile/:username/following",
                    element: <Following />,
                },
            ],
        },
        { path: "/welcome", element: <Welcome /> },
        { path: "/signup", element: <Signup /> },
        { path: "/get_token", element: <GetToken /> },
        { path: "/notifications", element: <div>In Development</div> },
        { path: "/messages", element: <div>In Development</div> },
    ]);

    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
