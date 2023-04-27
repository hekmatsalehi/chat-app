import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

function App() {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);
    return <RouterProvider router={router} />;
}

export default App;
