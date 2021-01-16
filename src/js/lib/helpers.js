// time conversions
export const mmToMs = (mins) => {
  return +mins * 60 * 1000;
};

export const msToMm = (mins) => {
  return +mins / 60 / 1000;
};

// calculate time left
export function calculateTimeLeft(start) {
  let currentTime = Date.now();
  const difference = start - currentTime;

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 60 / 1000) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
}

export function isObjEmpty(obj) {
  for (let i in obj) {
    return false;
  }
  return true;
}

export const localSetting = {
  get(accessKey) {
    return JSON.parse(window.localStorage.getItem(accessKey));
  },
  set(accessKey, settingValue) {
    window.localStorage.setItem(accessKey, JSON.stringify(settingValue));
  }
};
