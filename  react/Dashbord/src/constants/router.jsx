import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
]);

export default router;