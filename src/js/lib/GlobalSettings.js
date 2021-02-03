import React from 'react';
import { ACC_KEY } from './defaults';
import { localSetting } from './helpers';
//
// get settins object form local storeage
const settings = async () => {
  return await localSetting.get(ACC_KEY);
};

export const GlobalSettings = React.createContext(settings);
