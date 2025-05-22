import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";  
import './index.css'
import HomePages from './pages/home.tsx';
import AnimePages from './pages/anime.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePages/>,
  },
  {
    path: "/:id",
    element: <AnimePages/>,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
    
  </StrictMode>,
)
