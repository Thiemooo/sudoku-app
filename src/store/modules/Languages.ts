import { ColorTheme, Entry, Language } from "./types";
import { rules, controls } from './HowToPlay';
import { colorThemes }     from './ColorHandler';

const Languages: Language[] = [
  {
    language: 'English',
    app: {
      homeButton: 'Home',
      settingsButton: 'Settings'
    },
    home: {
      startButton: 'Start a Sudoku-Game',
      htpButton: 'How To Play'
    },
    htp: {
      headline: 'How to play:',
      rulesHeadline: 'Rules:',
      rules: rules.en,
      controlsHeadline: 'Controls:',
      controls: controls.en
    },
    settings: {
      headline: 'Settings:',
      colorHeadline: 'Color Themes',
      colorThemes: getColorTheme('en'),
      languageHeadline: 'Languages',
      languages: getLanguages(),
      selectButtonText: 'Select'
    },
    game: {
      possibilities: 'remaining solutions for this sudoku'
    },
    finished: {
      headline: 'Finished',
      text: "You've finished the sudoku in ~{{ this.getTime.minutes() > 0 ? `${this.getTime.minutes()} minute${this.getTime.minutes() > 1 ? 's' : '' } and` : ''}}~~ #~{{ `${this.getTime.seconds()%60} second${this.getTime.seconds()%60 != 1 ? 's' : ''}` }}##!",
      niceMsg: 'Great Job',
      or: 'or',
      button1text: 'Back to the main menu',
      button2text: 'Start a new Sudoku-Game'
    }
  },
  {
    language: 'Deutsch',
    app: {
      homeButton: 'Hauptmenü',
      settingsButton: 'Einstellungen'
    },
    home: {
      startButton: 'Starte ein Sudoku-Spiel',
      htpButton: 'Anleitung/Steuerung'
    },
    htp: {
      headline: 'Wie man spielt:',
      rulesHeadline: 'Regeln:',
      rules: rules.de,
      controlsHeadline: 'Steuerung:',
      controls: controls.de
    },
    settings: {
      headline: 'Einstellungen:',
      colorHeadline: 'Farbthemen',
      colorThemes: getColorTheme('de'),
      languageHeadline: 'Sprachen',
      languages: getLanguages(),
      selectButtonText: 'Auswählen'
    },
    game: {
      possibilities: 'verschiedene Lösungen für dieses Sudoku'
    },
    finished: {
      headline: 'Geschafft!',
      text: "You've finished the sudoku in ~{{ this.getTime.minutes() > 0 ? `${this.getTime.minutes()} minute${this.getTime.minutes() > 1 ? 's' : '' } and` : ''}}~~ #~{{ `${this.getTime.seconds()%60} second${this.getTime.seconds()%60 != 1 ? 's' : ''}` }}##!",
      niceMsg: 'Gut gemacht!',
      or: 'oder',
      button1text: 'Zurück zum Hauptmenü',
      button2text: 'Starte ein neues Sudoku-Spiel'
    }
  }
];

function getColorTheme(language: string): Entry[] {
  const __colorThemes: Entry[] = new Array(0);
  colorThemes.forEach((_colorTheme) => {
    __colorThemes.push({..._colorTheme.entry});    
    __colorThemes[__colorThemes.length-1].content = __colorThemes[__colorThemes.length-1].content.split(language.toUpperCase())[1].split('~~')[0];
  });
  return __colorThemes;
}

function getLanguages(): Entry[] {
  return [
    {
      title: 'EN',
      content: 'English',
      id: 'en'
    },
    {
      title: 'DE',
      content: 'Deutsch',
      id: 'de'
    }
  ]
}

let SelectedLanguage: Language = Languages[1];

function getLanguage(abbr: string): Language {
  switch (abbr.toLowerCase()) {
    case 'en': SelectedLanguage = Languages[0]; break;
    case 'de': SelectedLanguage = Languages[1]; break;
    default: SelectedLanguage = Languages[0];
  }
  return SelectedLanguage;
}

const getters = {
  getColorThemes: (): ColorTheme[] => colorThemes,
};

export {
  getLanguage
};

export default {
  getters,
}
/*
  {
    language: '',
    content:  [
      {
        title:   '',
        id:      '',
        content: ''
      }
    ]
  }
*/