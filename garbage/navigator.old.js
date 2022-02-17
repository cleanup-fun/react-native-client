import { useState } from "react";
import { useNavigate, useLocation } from "react-router-native";

export function useNavigator(){
  var navigate = useNavigate();
  let location = useLocation();
  var [history, setHistory] = useState([]);

  return {
    get currentPath(){
      return location.pathname;
    },
    get history(){
      const historyCopy = [...history];
      return historyCopy;
    },
    replace(nextPath){
      var newHistory = [...history];
      newHistory.pop();
      newHistory.push(location.pathname);
      setHistory(newHistory)
      navigate(nextPath);
    },
    to(nextPath){
      var newHistory = [...history];
      newHistory.push(location.pathname);
      setHistory(newHistory)
      navigate(nextPath);
    },
    clearHistory(){
      var newHistory = [];
      setHistory(newHistory);
    },
    back(){
      var newHistory = [...history];
      var nextPath = newHistory.pop();
      setHistory(newHistory);
      navigate(nextPath);
    },
  };

}
