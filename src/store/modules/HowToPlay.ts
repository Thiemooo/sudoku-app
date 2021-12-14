import { Entry } from './types';

const rules_en: Entry[] = [
  {
    title: '1:',
    content: 'Each of the 9 rows, columns and 3x3 squares must contain the numbers 1-9 only once.',
    id: 'rule-1',
  },
  {
    title: '2:',
    content: 'If you put in an incorrect number, you lose a heart. (WIP)',
    id: 'rule-2',
  },
  {
    title: '3:',
    content: 'If your hearts reach zero, you lose. (WIP)',
    id: 'rule-3',
  },
];

const rules_de: Entry[] = [
  {
    title: '1:',
    content: 'Jede der 9 Reihen, Spalten und 3x3 Felder muss genau einmal die Ziffern 1-9 enthalten.',
    id: 'rule-1',
  },
  {
    title: '2:',
    content: 'Bei Eingabe einer falschen Ziffer verlierst Du ein Leben. (WIP)',
    id: 'rule-2',
  },
  {
    title: '3:',
    content: 'Wenn Du 0 Leben erreichst, hast Du verloren. (WIP)',
    id: 'rule-3',
  },
];

const controls_en: Entry[] = [
  {
    title: 'Arrow-Keys',
    content: 'Navigate through the sudoku.',
    id: 'control-1'
  },
  {
    title: 'Number-Keys',
    content: 'Fill in a number you think fits.',
    id: 'control-2'
  },
  {
    title: 'Delete-Key',
    content: 'Removes the wrong number you filled in.',
    id: 'control-3'
  },
  {
    title: 'Left-Shift + Number-Key',
    content: 'Puts a notation in the field.',
    id: 'control-4'
  },
  {
    title: 'Left-Shift + Delete-Key',
    content: 'Removes all notations from a field.',
    id: 'control-5'
  },
  {
    title: 'Right-Shift',
    content: 'Toggles notation-mode.',
    id: 'control-6'
  },
  {
    title: 'Mouse',
    content: 'Clicking on the corresponding fields will perfom the same actions as with keyboard.',
    id: 'control-7'
  }
];

const controls_de: Entry[] = [
  {
    title: 'Pfeiltasten',
    content: 'Durch das Sudoku navigieren.',
    id: 'control-1'
  },
  {
    title: 'Zifferntasten',
    content: 'Eingabe einer Ziffer.',
    id: 'control-2'
  },
  {
    title: 'Delete-Taste',
    content: 'Löschen einer falsch eingegebenen Ziffer.',
    id: 'control-3'
  },
  {
    title: 'Left-Shift + Zifferntaste',
    content: 'Setzen einer Notiz/Merkhilfe ins Feld.',
    id: 'control-4'
  },
  {
    title: 'Left-Shift + Delete-Taste',
    content: 'Löschen aller Notizen/Merkhilfen aus dem Feld.',
    id: 'control-5'
  },
  {
    title: 'Right-Shift',
    content: 'Umschalten von Notiz- und Einfügemodus.',
    id: 'control-6'
  },
  {
    title: 'Maus',
    content: 'Gleiche Aktionen wie mit Tastatur, wenn die entsprechenden Felder angeklickt werden.',
    id: 'control-7'
  }
];

const rules = {
  en: rules_en, 
  de: rules_de
};

const controls = {
  en: controls_en,
  de: controls_de
};

export {
  rules,
  controls
};

/* 
  ,
  {
    title: '',
    content: ''
  }
*/