import React from 'react';
import { defaultSettings, ACC_KEY } from './defaults';
import { isObjEmpty, localSetting } from './helpers';
//
// get settins object form local storeage
const settings = async () => {
  const settings = await localSetting.get(ACC_KEY);
  if (isObjEmpty(settings)) {
    localSetting.set(ACC_KEY, defaultSettings);
  }
  return settings;
};

export const GlobalSettings = React.createContext(settings);
