import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "./routes";
import React from "react";

export const AppRoutes = () => {


  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
        <Route path="*" element={<Navigate to={"/"} replace />} />
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
