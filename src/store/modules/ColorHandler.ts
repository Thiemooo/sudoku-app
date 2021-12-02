import { Entry } from './types';

export interface ColorTheme {
  entry:   Entry;
  content: Entry[];
}

const colorThemes: ColorTheme[] = [
  {
    entry: {
      title:   '1',
      content: 'Default Theme',
      id:      'colorTheme-1'
    },
    content: [
      { title: 'background',          content: '#000008', id: 'colorTheme1-background' },
      { title: 'primary-color',       content: '#af4e9a', id: 'colorTheme1-primary-color' },
      { title: 'secondary-color',     content: '#f7a8e6', id: 'colorTheme1-secondary-color' },
      { title: 'button-color',        content: '#a37caf', id: 'colorTheme1-button-color' },
      { title: 'button-background',   content: '#000008', id: 'colorTheme1-button-background' },
      { title: 'header-line',         content: '#41977b', id: 'colorTheme1-header-line' },
      { title: 'border',              content: '#636060', id: 'colorTheme1-border' },
      { title: 'square-box-shadow',   content: '#9992b3', id: 'colorTheme1-square-box-shadow' },
      { title: 'row-column-border',   content: '#c534be', id: 'colorTheme1-row-column-border' },
      { title: 'row-column',          content: '#5c1c59', id: 'colorTheme1-row-column' },
      { title: 'same-number',         content: '#c986c5', id: 'colorTheme1-same-number' },
      { title: 'same-number-color',   content: '#d869d2', id: 'colorTheme1-same-number-color' },
      { title: 'primary-incorrect',   content: '#bb1414', id: 'colorTheme1-primary-incorrect' },
      { title: 'secondary-incorrect', content: '#830000', id: 'colorTheme1-secondary-incorrect' },
      { title: 'incorrect-color',     content: '#000008', id: 'colorTheme1-incorrect-color' },
    ]
  },
  {
    entry: {
      title:   '2',
      content: 'Dark Theme',
      id:      'colorTheme-2'
    },
    content: [
      { title: 'background',          content: '#000000', id: 'colorTheme2-background' },
      { title: 'primary-color',       content: '#32a827', id: 'colorTheme2-primary-color' },
      { title: 'secondary-color',     content: '#552424', id: 'colorTheme2-secondary-color' },
      { title: 'button-color',        content: '#ffffff', id: 'colorTheme2-button-color' },
      { title: 'button-background',   content: '#646464', id: 'colorTheme2-button-background' },
      { title: 'header-line',         content: '#202020', id: 'colorTheme2-header-line' },
      { title: 'border',              content: '#252525', id: 'colorTheme2-border' },
      { title: 'square-box-shadow',   content: '#a37171', id: 'colorTheme2-square-box-shadow' },
      { title: 'row-column-border',   content: '#1b191b', id: 'colorTheme2-row-column-border' },
      { title: 'row-column',          content: '#9b6f6f', id: 'colorTheme2-row-column' },
      { title: 'same-number',         content: '#446d63', id: 'colorTheme2-same-number' },
      { title: 'same-number-color',   content: '#000000', id: 'colorTheme2-same-number-color' },
      { title: 'primary-incorrect',   content: '#a50000', id: 'colorTheme2-primary-incorrect' },
      { title: 'secondary-incorrect', content: '#630000', id: 'colorTheme2-secondary-incorrect' },
      { title: 'incorrect-color',     content: '#000000', id: 'colorTheme2-incorrect-color' },
    ]
  },
  {
    entry: {
      title:   '3',
      content: 'Light Theme',
      id:      'colorTheme-3'
    },
    content: [
      { title: 'background',          content: '#cfcfcf', id: 'colorTheme3-background' },
      { title: 'primary-color',       content: '#f8f8f8', id: 'colorTheme3-primary-color' },
      { title: 'secondary-color',     content: '#3d3d3d', id: 'colorTheme3-secondary-color' },
      { title: 'button-color',        content: '#ffffff', id: 'colorTheme3-button-color' },
      { title: 'button-background',   content: '#646464', id: 'colorTheme3-button-background' },
      { title: 'header-line',         content: '#202020', id: 'colorTheme3-header-line' },
      { title: 'border',              content: '#524e61', id: 'colorTheme3-border' },
      { title: 'square-box-shadow',   content: '#948d8d', id: 'colorTheme3-square-box-shadow' },
      { title: 'row-column-border',   content: '#382e37', id: 'colorTheme3-row-column-border' },
      { title: 'row-column',          content: '#ffffff', id: 'colorTheme3-row-column' },
      { title: 'same-number',         content: '#c5c5c5', id: 'colorTheme3-same-number' },
      { title: 'same-number-color',   content: '#c4c4c4', id: 'colorTheme3-same-number-color' },
      { title: 'primary-incorrect',   content: '#c70000', id: 'colorTheme3-primary-incorrect' },
      { title: 'secondary-incorrect', content: '#9e2b2b', id: 'colorTheme3-secondary-incorrect' },
      { title: 'incorrect-color',     content: '#000000', id: 'colorTheme3-incorrect-color' },
    ]
  }
];

/*const actions = {
  setColorTheme(x: any, colorTheme = 0): void {
    console.log(typeof x);
    console.log(x);
    switch (colorTheme) {
      case 0:
        // Custom Color-Theme
        document.documentElement.style.setProperty('--background',          '');
        document.documentElement.style.setProperty('--primary-color',       '');
        document.documentElement.style.setProperty('--secondary-color',     '');
        document.documentElement.style.setProperty('--button-color',        '');
        document.documentElement.style.setProperty('--button-background',   '');
        document.documentElement.style.setProperty('--header-line',         '');
        document.documentElement.style.setProperty('--border',              '');
        document.documentElement.style.setProperty('--square-box-shadow',   '');
        document.documentElement.style.setProperty('--row-column-border',   '');
        document.documentElement.style.setProperty('--row-column',          '');
        document.documentElement.style.setProperty('--same-number',         '');
        document.documentElement.style.setProperty('--same-number-color',   '');
        document.documentElement.style.setProperty('--primary-incorrect',   '');
        document.documentElement.style.setProperty('--secondary-incorrect', '');
        document.documentElement.style.setProperty('--incorrect-color',     '');
          break;
      case 1:
        // Default Color-Theme
        document.documentElement.style.setProperty('--background',          '#000008');
        document.documentElement.style.setProperty('--primary-color',       '#af4e9a');
        document.documentElement.style.setProperty('--secondary-color',     '#f7a8e6');
        document.documentElement.style.setProperty('--button-color',        '#a37caf');
        document.documentElement.style.setProperty('--button-background',   '#000008');
        document.documentElement.style.setProperty('--header-line',         '#41977b');
        document.documentElement.style.setProperty('--border',              '#636060');
        document.documentElement.style.setProperty('--square-box-shadow',   '#9992b3');
        document.documentElement.style.setProperty('--row-column-border',   '#c534be');
        document.documentElement.style.setProperty('--row-column',          '#5c1c59');
        document.documentElement.style.setProperty('--same-number',         '#c986c5');
        document.documentElement.style.setProperty('--same-number-color',   '#d869d2');
        document.documentElement.style.setProperty('--primary-incorrect',   '#bb1414');
        document.documentElement.style.setProperty('--secondary-incorrect', '#830000');
        document.documentElement.style.setProperty('--incorrect-color',     '#000008');
          break;
      case 2:
        // Dark Color-Theme
        document.documentElement.style.setProperty('--background',          '#000000');
        document.documentElement.style.setProperty('--primary-color',       '#32a827');
        document.documentElement.style.setProperty('--secondary-color',     '#552424');
        document.documentElement.style.setProperty('--button-color',        '#ffffff');
        document.documentElement.style.setProperty('--button-background',   '#646464');
        document.documentElement.style.setProperty('--header-line',         '#202020');
        document.documentElement.style.setProperty('--border',              '#252525');
        document.documentElement.style.setProperty('--square-box-shadow',   '#a37171');
        document.documentElement.style.setProperty('--row-column-border',   '#1b191b');
        document.documentElement.style.setProperty('--row-column',          '#9b6f6f');
        document.documentElement.style.setProperty('--same-number',         '#446d63');
        document.documentElement.style.setProperty('--same-number-color',   '#000000');
        document.documentElement.style.setProperty('--primary-incorrect',   '#a50000');
        document.documentElement.style.setProperty('--secondary-incorrect', '#630000');
        document.documentElement.style.setProperty('--incorrect-color',     '#000000');
          break;
      case 3:
        // Light Color-Theme
        document.documentElement.style.setProperty('--background',          '#9c9c9c');
        document.documentElement.style.setProperty('--primary-color',       '#f8f8f8');
        document.documentElement.style.setProperty('--secondary-color',     '#3d3d3d');
        document.documentElement.style.setProperty('--button-color',        '#ffffff');
        document.documentElement.style.setProperty('--button-background',   '#646464');
        document.documentElement.style.setProperty('--header-line',         '#202020');
        document.documentElement.style.setProperty('--border',              '#524e61');
        document.documentElement.style.setProperty('--square-box-shadow',   '#948d8d');
        document.documentElement.style.setProperty('--row-column-border',   '#382e37');
        document.documentElement.style.setProperty('--row-column',          '#ffffff');
        document.documentElement.style.setProperty('--same-number',         '#c5c5c5');
        document.documentElement.style.setProperty('--same-number-color',   '#c4c4c4');
        document.documentElement.style.setProperty('--primary-incorrect',   '#c70000');
        document.documentElement.style.setProperty('--secondary-incorrect', '#9e2b2b');
        document.documentElement.style.setProperty('--incorrect-color',     '#000000');
          break;
    }
  }
};*/

const getters = {
  getColorThemes:     (): ColorTheme[] => colorThemes,
}

export {
  colorThemes,
};

export default {
  getters,
};