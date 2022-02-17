import React, { Fragment } from "react";
import { Text } from "react-native";
import { Route, Routes } from "react-router-native";

import { routeItems } from "./route-constants";

const routeValues = Object.values(routeItems);
console.log(routeValues);
export function UserPageChildren(){
  return (
    routeValues.map((routeItem)=>{
      const RouteItemComponent = routeItem.component;
      return (
        <Route
          index={routeItem.index}
          key={routeItem.key}
          path={routeItem.path}
          element={<RouteItemComponent />}
          title={routeItem.title}
        />
      );
    })
  );
}
