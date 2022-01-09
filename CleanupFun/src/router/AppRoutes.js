import React from "react";
import { Text } from "react-native";
import { Route, Routes } from 'react-router-native';

import { PATH_MAIN_MENU, routeItems } from "./route-constants";

import { MenuWrapper } from "./MenuWrapper";

function AppRoutes(){
  const routeItemsArray = Object.values(routeItems);
  return (
    <Routes>
      {
        routeItemsArray.map((routeItem)=>{
          const RouteItemComponent = routeItem.component;
          return (
            <Route
              key={routeItem.key}
              path={routeItem.path}
              element={<RouteItemComponent />}
              title={routeItem.title}
            />
          );
        })
      }
    </Routes>
  );

}


export { AppRoutes };
