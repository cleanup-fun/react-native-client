import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { NativeRouter, useNavigate, useLocation } from "react-router-native";
import { resolve as urlResolve } from "url";

export const HistoryContext = createContext([]);

export function useHistory(){
  return useContext(HistoryContext);
}

export const NavigatorContext = createContext({
  to(){},
  replace(){},
  back(){},
  clear(){},
});

export function useNavigator(){
  return useContext(NavigatorContext);
}
export function NavigatorContextProvider(props){
  const { children } = props;
  const forNativeRouter = { ...props };
  delete forNativeRouter.children;
  return (
    <NativeRouter {...forNativeRouter}>
      <NavigatorContextProviderNoRouter>
        { children }
      </NavigatorContextProviderNoRouter>
    </NativeRouter>
  );
}

export function NavigatorContextProviderNoRouter(props){
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [trackedTime, setTrackedTime] = useState(Date.now());
  const [history, setHistory] = useState([]);
  useEffect(()=>{
    const lastItem = history[history.length - 1];
    if(

      // first route should append to the history
      history.length > 0 &&

      // If we've already updated and it's just reacting
      // It might just be reacting to history getting updated
      // we don't have to append
      // Hopefully all states and contexts are updated at the same time
      // Rather than one at a time
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
  }, [trackedTime, location, history]);

  return (
    <HistoryContext.Provider value={[...history]}>
    <NavigatorContext.Provider
      value={createNavigator(
        location, navigate, setTrackedTime, history, setHistory,
      )}
    >
      {children}
    </NavigatorContext.Provider>
    </HistoryContext.Provider>
  );
}

function createNavigator(location, navigate, setTrackedTime, history, setHistory){
  const to = function(nextPathUnresolved){
    const nextPath = resolveUrl(location, nextPathUnresolved);
    setTrackedTime(Date.now());
    navigate(nextPath);
  };
  Object.defineProperties(to, {
    to: {
      value: to,
      writable: false,
    },
    replace: {
      value(nextPathUnresolved){
        const nextPath = resolveUrl(location, nextPathUnresolved);
        history.pop();
        setTrackedTime(Date.now());
        navigate(nextPath);
      },
      writable: false,
    },
    back: {
      value(){
        // Instead of removing history, I should just set the index
        // This way I can allow the person to also go forward
        // Although forward is not supported
        // Then if the person is at an old index
        // and they go to a different page then the next one
        // I can either clear history or "branch" the history

        // get rid of the current path
        history.pop();

        // get the previous path
        // it will get readded in the use effect
        var nextPath = history.pop();
        setTrackedTime(Date.now());

        // let the use effect do the work
        navigate(nextPath);
      },
      writable: false,
    },
    clear: {
      value(nextPath){
        setTrackedTime(Date.now());
        nextPath && navigate(nextPath);

        // We navigate before setting history so
        // navigate pushes the new location
        // set history clears the history
        // The use effect sees we have an empty history
        // pushes the new location
        // otherwise it would push the previous and the new location
        setHistory([]);
      },
      writable: false,
    },
  });

  return to;
}

function resolveUrl(previousLocation, nextLocation){
  const [pathname, ...brokenRest] = nextLocation.split("?");
  console.log(previousLocation, nextLocation);
  const nextPath = urlResolve(previousLocation.pathname, pathname);
  console.log(nextPath);
  return [nextPath].concat(brokenRest).join("?");
}
