import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
// import GreetingPage from '../components/GreetingPage/GreetingPage';
import SplashPage from "../components/SplashPage/SplashPage";
import CreateSongForm from "../components/CreateSongForm/CreateSongForm";
import SongDetails from "../components/SongDetails/SongDetails";
import UpdateSongs from "../components/ManageSongs/UpdateSongs";
import UserSongs from "../components/ManageSongs/UserSongs";

// import CreateCommentModal from "../components/Comments/CreateCommentModal";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [,
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "songs",
        element: <SplashPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "songs/new",
        element: <CreateSongForm />,
      },
      {
        path: "songs/:id",
        element: <SongDetails />,
      },
      {
        path: "songs/current",
        element: <UserSongs />,
      },
      {
        path: "songs/edit/:id",
        element: <UpdateSongs />,
      },
      // {
      //   path: "comments/new",
      //   element: <CreateCommentModal />,
      // },
    ],
  },
]);
