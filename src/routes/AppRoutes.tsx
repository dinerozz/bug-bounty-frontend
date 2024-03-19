import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import React from "react";
import { AuthRedirect } from "@/routes/AuthRedirect";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const isAuthRoute = ["/signin", "/signup"].includes(route.path);

          return (
            <Route
              key={index}
              path={route.path}
              element={
                isAuthRoute ? (
                  <AuthRedirect>{route.element}</AuthRedirect>
                ) : (
                  route.element
                )
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to={"/"} replace />} />
        {privateRoutes.map((route, index) => {
          const isAuthRoute = ["/profile"].includes(route.path);

          return (
            <Route
              key={index}
              path={route.path}
              element={
                isAuthRoute ? (
                  <ProtectedRoute>{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};
