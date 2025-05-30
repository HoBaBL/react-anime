
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";  
import './index.css'
import HomePages from './pages/home.tsx';
import AnimePages from './pages/anime.tsx';
import CatalogPages from './pages/catalog.tsx';
import CatalogNewPages from './pages/catalogNew.tsx';
import GenresPages from './pages/genres.tsx';
import CatalogGenresPages from './pages/catalogGenres.tsx';

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
  {
    path: "/catalog/new",
    element: <CatalogNewPages/>,
  },
  {
    path: "/catalog/genres",
    element: <GenresPages/>,
  },
  {
    path: "/genres/:id",
    element: <CatalogGenresPages/>,
  },
]);


createRoot(document.getElementById('root')!).render(
      <RouterProvider router={router} />
)
