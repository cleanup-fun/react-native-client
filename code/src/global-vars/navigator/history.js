import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { NativeRouter, useNavigate, useLocation } from "react-router-native";

export const HistoryContext = createContext([])

export function useHistory(){
  return useContext(HistoryContext);
}

export function HistoryContextProvider({ history: propsHistory, children }){
  const [history, setHistory] = useState([]);
  useEffect(()=>{
    if(propsHistory){
      setHistory(propsHistory);
    }
  }, [propsHistory]);
  useEffect(()=>{
    const lastItem = history[history.length - 1];
    if(

      // first route should append to the history
      history.length > 0 &&

      // If we've already updated and it's just reacting
      // It might just be reacting to history getting updated
      // we don't have to append
      (
        trackedTime === lastItem.timestamp
      )
    ) return;
    var newHistory = [...history];
    newHistory.push({
      timestamp: trackedTime,

      // right now it only tracks pathname but you can handle searches and hashes
      pathname: location.pathname,
    });
    setHistory(newHistory);
  }, [location, history]);

  return (
    <HistoryContext.Provider value={history}>
      {children}
    </HistoryContext.Provider>
  );
}
