import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Login from "./Pages/Login";


const router = createBrowserRouter ([
    {path: "/", element: <Login />},
]);

export default router;

