import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout></MainLayout>,
      children: [
        {
          element: <LoadingPage></LoadingPage>,
          path: "login",
        },
        {
          element: <RegisterPage></RegisterPage>,
          path: "register",
        },
        {
          element: <ResetPasswordPage></ResetPasswordPage>,
          path: "resetPassword",
        },
        {
          element: <NewPasswordPage></NewPasswordPage>,
          path: "newPassword",
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "groups", element: <GroupPage /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);

const LoadingPage = Loadable(lazy(() => import("../pages/Auth/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/Auth/Register")));
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/Auth/ResetPassword"))
);
const NewPasswordPage = Loadable(
  lazy(() => import("../pages/Auth/NewPassword"))
);

const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const GroupPage = Loadable(lazy(() => import("../pages/dashboard/Groups")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
