import { shadeColor } from './helpers';

// Local storeage access key
const ACC_KEY = 'MAIN_TIMER_SETTINGS';

// default
const defaultSettings = {
  isDefault: true,
  workTime: 2000, // time default setting
  restTime: 5000, // rest time default setting
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

export { defaultSettings, ACC_KEY };
