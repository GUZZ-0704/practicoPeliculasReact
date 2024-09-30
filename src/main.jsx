import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FilmPage from './pages/Film/FilmPage.jsx';
import CastPage from './pages/Cast/CastPage.jsx';
import FilmDetail from './pages/Film/FilmDetail.jsx';
import ActorDetail from './pages/Cast/ActorDetail.jsx';
import ListFilm from './pages/Film/admin/ListFilm.jsx';
import ListActor from './pages/Cast/admin/ListActor.jsx';
import FormActor from './pages/Cast/admin/FormActor.jsx';
import PhotoActor from './pages/Cast/admin/PhotoActor.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhotoFilm from './pages/Film/admin/PhotoFilm.jsx';
import FormFilm from './pages/Film/admin/FormFilm.jsx';
import CastFilm from './pages/Film/admin/CastFilm.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <FilmPage />,
  },
  {
    path: "/films",
    element: <FilmPage />,
  },
  {
    path: "/cast",
    element: <CastPage />
  },
  {
    path: "/film/:id",
    element: <FilmDetail/>
  },
  {
    path: "/cast/:id",
    element: <ActorDetail/>
  },
  {
    path: "/admin/films",
    element: <ListFilm />,
  },
  {
    path: "/admin/films/create",
    element: <FormFilm />,
  },{
    path: "/admin/films/:id",
    element: <FormFilm />,
  },
  {
    path: "/admin/films/:id/photo",
    element: <PhotoFilm/>,
  },
  {
    path: "/admin/people",
    element: <ListActor/>,
  },
  {
    path: "/admin/people/create",
    element: <FormActor/>,
  },
  {
    path: "/admin/people/:id",
    element: <FormActor/>,
  },
  {
    path: "/admin/people/:id/photo",
    element: <PhotoActor/>,
  },{
    path: "/admin/cast/:id",
    element: <CastFilm/>
  }

  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
