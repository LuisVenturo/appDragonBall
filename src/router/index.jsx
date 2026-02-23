import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import DragonBall from "../pages/DragonBall";
import CharacterDetail from "../pages/CharacterDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/dragonball",
        element: <DragonBall />
      },
      {
        path: "/dragonball/:id",
        element: <CharacterDetail />
      }
    ]
  }
]);
