import React from "react";
import { Text } from "react-native";
import { Route, Routes, Outlet } from 'react-router-native';

import { PATH_MAIN_MENU, routeItems } from "./route-constants";

import { MenuWrapper } from "./MenuWrapper";

function AppRoutes(){
  const routeItemsArray = Object.values(routeItems);
  return (
    <Routes>
      {routeItemsArray.map(renderRoute)}
    </Routes>
  );
}

function renderRoute(routeItem){
  const routes = routeItem.routes && Object.values(routeItem.routes);
  const children = routes ? routes.map(renderRoute) : null;
  const RouteItemComponent = routeItem.component || Outlet;
  return (
    <Route
      key={routeItem.key}
      path={routeItem.pathmatch || routeItem.path}
      element={<RouteItemComponent />}
      title={routeItem.title}
    >{children}</Route>
  );
}

export { AppRoutes };
