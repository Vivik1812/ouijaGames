import { lazy } from "react";

const Home = lazy(() => import("../pages/user/Home"));
const Login = lazy(() => import("../pages/auth/login"));
const CreateUser = lazy(() => import("../pages/auth/create-user"));
const HomeAdmin = lazy(() => import("../pages/admin/HomeAdmin"));
const HomeJuegos = lazy(() => import("../pages/admin/Juegos/HomeJuegos"));

const publicRoutes = [
  { path: "/", element: <Home />, showNavbar: true },
  { path: "/login", element: <Login />, showNavbar: false },
  { path: "/create-user", element: <CreateUser />, showNavbar: false },
];

const adminRoutes = [
  { path: "/admin/dashboard", element: <HomeAdmin />, isAdmin: true },
  { path: "admin/juegos", element: <HomeJuegos />, isAdmin: true },
];

const notFoundRoute = {
  path: "*",
  element: (
    <div className="text-center py-10 text-2xl">
      404 - La pagina se perdio :(
    </div>
  ),
  showNavbar: false,
};

export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];
