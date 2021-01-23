// time conversions
export const mmToMs = (mins) => {
  return +mins * 60 * 1000;
};

export const msToMm = (mins) => {
  return +mins / 60 / 1000;
};

export function isObjEmpty(obj) {
  for (let i in obj) {
    return false;
  }
  return true;
}

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

// Get and sett values to local storeage
export const localSetting = {
  get(accessKey) {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(window.localStorage.getItem(accessKey)) || {});
    });
  },
  set(accessKey, settingValue) {
    window.localStorage.setItem(accessKey, JSON.stringify(settingValue));
  }
};

// transform hex color
export function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
}
