import React from "react";
//import { Main } from "./src/index";
import type {Node} from 'react';
import {
  Text,
} from 'react-native';

import { Main } from "./src/Main";


const App: ()=> Node = () => {
  return (
    <Main />
  );
}

export default App;
