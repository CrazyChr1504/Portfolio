import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Login from "./Pages/Login";
import Verify from "./Pages/Verify";

const router = createBrowserRouter ([
    {path: "/", element: <Login />},
    {path: "/Verify", element: <Verify />},
]);

export default router;