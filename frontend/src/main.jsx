import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bag from "./routes/Bag.jsx";
import Home from "./routes/Home.jsx";
import { Provider } from "react-redux";
import { myStore } from "./store/index.js";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import AdminLogin from "./routes/AdminLogin.jsx";
import AddProduct from "./routes/AddProduct.jsx";
import ModifyProducts from "./routes/ModifyProducts.jsx";
import Wishlist from "./routes/Wishlist.jsx";
import Profile from "./routes/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bag",
        element: <Bag />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/add-product/:productId",
        element: <AddProduct />,
      },
      {
        path: "/admin/modify-products",
        element: <ModifyProducts />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={myStore}>
    <RouterProvider router={router} />
  </Provider>,
);
