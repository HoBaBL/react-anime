
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
import FavouritesPages from './pages/favouritesPage.tsx';
import RegisterAuth from './pages/register.tsx';
import LoginAuth from './pages/login.tsx';
import ViewedPages from './pages/viewedPage.tsx';

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
  {
    path: "/favourites",
    element: <FavouritesPages/>,
  },
  {
    path: "/registration",
    element: <RegisterAuth/>,
  },
  {
    path: "/login",
    element: <LoginAuth/>,
  },
  {
    path: "/viewed",
    element: <ViewedPages/>,
  },
]);


createRoot(document.getElementById('root')!).render(
      <RouterProvider router={router} />
)
