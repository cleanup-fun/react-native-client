import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { isRelativeTimestamp } from "./translators";
import { useTranslate } from "./provider-and-hook";

export function TranslatedText(props){
  const { tPath, options } = props;
  const propsToPass = { ...props };
  delete propsToPass.tPath;
  delete propsToPass.options;

  const { t } = useTranslate();
  const ret = t(tPath, options);
  return (<Text {...propsToPass}>{ret}</Text>);
}

export function TranslatedTimestamp(props){
  const { timestamp, tPath, options } = props;
  const propsToPass = { ...props };
  delete propsToPass.timestamp;
  delete propsToPass.tPath;
  delete propsToPass.options;

  const [t, setT] = useState();
  const [i, setI] = useState();
  const [, rerender] = useState(Date.now());
  useEffect(()=>{
    // if its no longer relative, lets clear and stop
    if(!isRelativeTimestamp(timestamp, options)){
      clearTimeout(t); clearInterval(i);
      setT(void 0); setI(void 0);
      return;
    }

    // if we already set, we don't need to run again
    if(t) return;
    setT(setTimeout(()=>{
      if(!isRelativeTimestamp(timestamp, options)){
        // there may have been a change in props since last render
        setT(void 0);
        return;
      }
      rerender(Date.now());
      setI(setInterval(()=>{
        if(!isRelativeTimestamp(timestamp)){
          // We don't need to clear timeout because it is already completed
          // We may not need to set the interval also
          // Although I believe we need to just in case the props change
          clearInterval(i);
          setT(void 0); setI(void 0);
        } else {
          rerender(Date.now());
        }
      }, 1000));
    }, 1000 - Math.abs(timestamp % 1000)));
    return ()=>{
      clearTimeout(t);
      clearInterval(i);
    };
  }, [t, i, timestamp, options]);

  const { tTimestamp } = useTranslate();
  return (<Text {...propsToPass}>{tTimestamp(timestamp, tPath, options)}</Text>);
}

export function TranslatedDateTime(props){
  const { datetime, tPath, options } = props;
  const propsToPass = { ...props };
  delete propsToPass.timestamp;
  delete propsToPass.tPath;
  delete propsToPass.options;

  const [ready, setReady] = useState(false);
  const [, rerender] = useState(Date.now());
  useEffect(()=>{
    if(ready) return;
    setReady(true);
    const i = setInterval(()=>{
      if(!isRelativeTimestamp(datetime.getTime())){
        clearInterval(i);
      } else {
        rerender(Date.now());
      }
    }, 1000);
    return ()=>(clearInterval(i));
  }, [ready, datetime]);

  const { tDateTime } = useTranslate();
  return (<Text {...propsToPass}>{tDateTime(datetime, tPath, options)}</Text>);
}
