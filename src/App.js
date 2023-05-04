import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>,
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
    return <RouterProvider router={router} />;
}

function ProtectedRoute ({children}) {
    const { currentUser } = useContext(AuthContext);
    if(!currentUser) {
        return <Navigate to="/login" />
    }

    return children;
}
export default App;
