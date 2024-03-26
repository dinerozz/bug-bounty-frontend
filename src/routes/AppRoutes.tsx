import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import React, { createContext, useEffect, useState } from "react";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { useRecoilState } from "recoil";
import { userInfoStateSelector } from "@/store/authState";
import { defineUserAbilities } from "@/utils/ability";
import { createContextualCan } from "@casl/react";

export const AbilityContext = createContext<any>(null);
export const Can = createContextualCan(AbilityContext.Consumer);

export const AppRoutes = () => {
  const [userInfo] = useRecoilState(userInfoStateSelector);
  const [ability, setAbility] = useState(defineUserAbilities(userInfo));

  useEffect(() => {
    if (userInfo) {
      setAbility(defineUserAbilities(userInfo));
    }
  }, [userInfo]);

  return (
    <AbilityContext.Provider value={ability}>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}

          {privateRoutes.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AbilityContext.Provider>
  );
};
