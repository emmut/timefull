import { shadeColor } from './helpers';

// default
export const defaultSettings = {
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
  },

  inFace: true,
  alertSound: true
};
// generate dark variant
defaultSettings.setPrimaryDarkColor = defaultSettings.colors.primary.light;
defaultSettings.setSecondaryDarkColor = defaultSettings.colors.secondary.light;

export const defaultColorsPicker = [
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

export const paths = {
  primary: [
    'M 96 470 C 49.481 422.208 69 406.699 69 335 C 69 256.668 64.664 194.615 119 146 C 166.308 103.673 217.413 57 286 57 C 357.232 57 429.105 65.728 477 111 C 528.188 159.385 535 188.298 535 264 C 535 338.515 547.788 421.761 498 470 C 449.88 516.623 392.425 545 320 545 C 244.742 545 144.553 519.882 96 470 Z',
    'M 108.162 461 C 61.643 413.208 60 351.699 60 280 C 60 201.668 77.664 165.615 132 117 C 179.308 74.673 254.413 45 323 45 C 394.232 45 438.379 86.728 486.274 132 C 537.462 180.385 552 243.298 552 319 C 552 393.515 522.788 459.761 473 508 C 424.88 554.623 358.425 555 286 555 C 210.742 555 156.715 510.882 108.162 461 Z'
  ],
  secondary: [
    'M 96 470 C 49.481 422.208 69 406.699 69 335 C 69 256.668 64.664 194.615 119 146 C 166.308 103.673 217.413 57 286 57 C 357.232 57 429.105 65.728 477 111 C 528.188 159.385 535 188.298 535 264 C 535 338.515 547.788 421.761 498 470 C 449.88 516.623 392.425 545 320 545 C 244.742 545 144.553 519.882 96 470 Z',
    'M 108.162 461 C 61.643 413.208 60 351.699 60 280 C 60 201.668 77.664 165.615 132 117 C 179.308 74.673 254.413 45 323 45 C 394.232 45 438.379 86.728 486.274 132 C 537.462 180.385 552 243.298 552 319 C 552 393.515 522.788 459.761 473 508 C 424.88 554.623 358.425 555 286 555 C 210.742 555 156.715 510.882 108.162 461 Z'
  ]
};
