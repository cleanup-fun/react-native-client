
export function translateText(t, path, options){
  return t(path, options);
}

const SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_MILLISECONDS = 60 * SECOND_IN_MILLISECONDS;
const HOUR_IN_MILLISECONDS = 60 * MINUTE_IN_MILLISECONDS;
const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;
const WEEK_IN_MILLISECONDS = 7 * DAY_IN_MILLISECONDS;

const RELATVE_TIME_TESTS = [
  { range: "day", duration: DAY_IN_MILLISECONDS },
  { range: "hour", duration: HOUR_IN_MILLISECONDS },
  { range: "minute", duration: MINUTE_IN_MILLISECONDS },
  { range: "second", duration: SECOND_IN_MILLISECONDS },
];

export function isRelativeTimestamp(timestamp, options){
  const maxRelativeTime = (
    !options ? WEEK_IN_MILLISECONDS :
    typeof options.maxRelativeTime !== "number" ?
    WEEK_IN_MILLISECONDS : options.maxRelativeTime
  );
  const diff = timestamp - Date.now();
  return Math.abs(diff) < maxRelativeTime;
}

export function translateTimestamp(t, timestamp, path, options){
  options = {
    ...(options || {}),
    val: new Date(timestamp),
  };
  if(path){
    return t(path, options);
  }
  const maxRelativeTime = (
    typeof options.maxRelativeTime === "number" ?
    options.maxRelativeTime : WEEK_IN_MILLISECONDS
  );
  const diff = timestamp - Date.now();
  if(Math.abs(diff) >= maxRelativeTime){
    return t("intlDateTime", options);
  }
  var relativeTime;
  RELATVE_TIME_TESTS.some((test)=>{
    const amountOfRange = Math.floor(Math.abs(diff / test.duration));
    if(amountOfRange === 0) return false;
    relativeTime = {
      val: amountOfRange * Math.sign(diff),
      range: test.range,
    };
    return true;
  });
  if(relativeTime === void 0){
    return t("intNowTime", options);
  }
  return t("intlRelativeTime", {
    ...options,
    val: relativeTime.val,
    range: relativeTime.range,
  });
}
