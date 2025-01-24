import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import Search from "./components/pages/Search";
import Profile from "./components/pages/Profile";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

//DONE: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "32524058644-7k33l0ea0b002s33kn21oq1uoee8t3p2.apps.googleusercontent.com";

const router = createBrowserRouter(
  //<Route path="/" element={<Skeleton />}/>
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Search />} />
      <Route path="/search/" element={<Search />} />
      <Route path="/profile/:userId" element={<Profile />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
