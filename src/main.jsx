import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";  // ✅ import store

import Home from "./pages/Home.jsx";
import TeacherPage from "./pages/TeacherPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/teacher",
    element: <TeacherPage />,
  },
  {
    path: "/student",
    element: <StudentPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
