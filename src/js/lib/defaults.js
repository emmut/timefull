import { shadeColor } from './helpers';

// default
const defaultSettings = {
  workTime: 1200000, // time default setting
  restTime: 300000, // rest time default setting

  colors: {
    primary: '#fbb02d',
    primaryDark: '',
    secondary: '#63c132',
    secondaryDark: ''
  }
};

// TODO: make prettier
defaultSettings.colors.primaryDark = shadeColor(
  defaultSettings.colors.primary,
  -15
);
defaultSettings.colors.secondaryDark = shadeColor(
  defaultSettings.colors.secondary,
  -15
);

export { defaultSettings };
