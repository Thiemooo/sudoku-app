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