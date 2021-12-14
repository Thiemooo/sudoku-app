export interface SudokuField {
  fieldID:          string;
  square:           number;
  row:              number;
  column:           number;
  possibleContents: number[] | string;
  content:          number | string;
  data:             string;
  hidden:           boolean;
  wrong:            boolean;
  wrongContent:     number | string;
  notations:        string[];
}

export interface Entry {
  content: string;
  title:   string;
  id:      string;
}

export interface ColorTheme {
  entry:   Entry;
  content: Entry[];
}

export interface Language {
  language:           string;
  app: {
    homeButton:       string;
    settingsButton:   string;
  };
  home: {
    startButton:      string;
    htpButton:        string;
  },
  htp: {
    headline:         string;
    rulesHeadline:    string;
    rules:            Entry[];
    controlsHeadline: string;
    controls:         Entry[];
  },
  settings: {
    headline:         string;
    colorHeadline:    string;
    colorThemes:      Entry[];
    languageHeadline: string;
    languages:        Entry[];
    selectButtonText: string;
  },
  finished: {
    headline:         string;
    text:             string;
    niceMsg:          string;
    button1text:      string;
    or:               string;
    button2text:      string;
  }
}