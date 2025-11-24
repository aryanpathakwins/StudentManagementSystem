import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "../Component/AppRoutes"; 
import Home from "../Pages/Home";
import StudentInteraction from "../StudentForm";
import Phones from "../Pages/Phones";

const Index: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppRoutes />,  
      children: [
        {
          index: true, 
          element: <Home />,
        },
        {
          path: "students",
          element: <StudentInteraction />,
        },
        {
          path: "phones",
          element: <Phones />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Index;
