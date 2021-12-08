import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',

  colorPrimary: '#FF0032',
  colorSecondary: '#FF0032',

  // UI
  appBg: '#333D47',
  appContentBg: '#333D47',
  appBorderColor: 'rgba(255,255,255,0.2)',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#fff',
  textInverseColor: '#333d47',

  // Toolbar default and active colors
  barTextColor: '#fff',
  barSelectedColor: '#FF0032',
  barBg: '#333d47',

  // Form colors
  inputBg: 'rgba(255,255,255,0.1)',
  inputBorder: 'rgba(255,255,255,0.3)',
  inputTextColor: '#fff',
  inputBorderRadius: 2,

  brandTitle: 'Zest - Gousto\'s component library',
  brandUrl: 'https://gousto.co.uk',
  brandImage: './images/zest-logo.svg',
});
