import { createBrowserRouter } from "react-router-dom";
import React from "react";


import App from "./Pages/App";
import Admin from "./Pages/AdminCheck"


const router = createBrowserRouter ([
    {path: "/", element: <App />},
    {path: "/admin", element: <Admin />},
    
]);

export default router;