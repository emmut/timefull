import React from 'react';
import { localSetting } from './helpers';
//
// get settins object form local storeage
const settings = async () => {
  return await localSetting.get();
};

export const GlobalSettings = React.createContext(settings);
