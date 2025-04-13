import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    // {
    //     path: '/About',
    //     element: <About/>
    // },
    {
        path: '*',
        element: <div>Error</div>
    }
])

export default router
