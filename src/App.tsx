import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./fallback";
import CircularLoader from "./components/Loader/CircularLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Basket = lazy(() => import("./pages/Basket"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={<CircularLoader />}>
        <Basket />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
