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

const defaultColorsPicker = [
  '#D9E3F0',
  '#F47373',
  '#697689',
  '#37D67A',
  '#2CCCE4',
  '#555555',
  '#dce775',
  '#ff8a65',
  '#ba68c8'
];

const notificationText = {
  transitionToRest: {
    title: 'Pause',
    body: "It's time to pause",
    sound: true
  },
  transitionToWork: {
    title: 'Break has ended',
    body: "It's time to go back to work",
    sound: true
  }
};

export { defaultSettings, defaultColorsPicker, notificationText };
