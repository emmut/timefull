import { shadeColor } from './helpers';

// default
const defaultSettings = {
  workTime: 1200000, // time default setting
  restTime: 300000, // rest time default setting

  colors: {
    primary: {
      light: '#fbb02d',
      dark: ''
    },
    secondary: {
      light: '#63c132',
      dark: ''
    }
  },
  set setPrimaryDarkColor(color) {
    this.colors.primary.dark = shadeColor(color, -15);
  },
  set setSecondaryDarkColor(color) {
    this.colors.secondary.dark = shadeColor(color, -15);
  }
};
// generate dark variant
defaultSettings.setPrimaryDarkColor = defaultSettings.colors.primary.light;
defaultSettings.setSecondaryDarkColor = defaultSettings.colors.secondary.light;

export { defaultSettings };
