import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
// import GreetingPage from '../components/GreetingPage/GreetingPage';
import SplashPage from "../components/SplashPage/SplashPage";
import SongDetails from "../components/SongDetails/SongDetails";
import UpdateSongs from "../components/ManageSongs/UpdateSongs";
// import SliderComp from "../components/SplashPage/SliderComp";
// import UserSongs from "../components/ManageSongs/UserSongs";
import TabsComponent from "../components/ManageSongs/Tabs/TabsComponent";
import UserProfile from "../components/UserProfile/UserProfile";
import CreateSongForm2 from "../components/CreateSongForm/CreateSongForm2";

// import CreateCommentModal from "../components/Comments/CreateCommentModal";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
        element: <CreateSongForm2 />,
      },
      {
        path: "songs/:id",
        element: <SongDetails />,
      },
      {
        path: "songs/current",
        element: <TabsComponent />,
      },
      {
        path: "songs/edit/:id",
        element: <UpdateSongs />,
      },
      {
        path: "user/:id",
        element: <UserProfile />,
      },
    ],
  },
]);
