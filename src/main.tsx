
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";  
import './index.css'
import HomePages from './pages/home.tsx';
import AnimePages from './pages/anime.tsx';
import CatalogPages from './pages/catalog.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePages/>,
  },
  {
    path: "/:id",
    element: <AnimePages/>,
  },
  {
    path: "/catalog",
    element: <CatalogPages/>,
  },
]);


createRoot(document.getElementById('root')!).render(
      <RouterProvider router={router} />
)
