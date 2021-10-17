/*=================================================================*/
export interface SudokoField {
  fieldID:      string;
  square:       number;
  row:          number;
  column:       number;
  content:      number | string;
  data:         string;
  hidden:       boolean;
  wrong:        boolean;
  wrongContent: number | string;
  notations:    string[];
}
/*=================================================================*/
const forEachSudokuField = (sudoku: SudokoField[][], callback: { (field: SudokoField): void} ): SudokoField[][] => {
  
  // Run the callback function on every field of the sudoku
  for (let square = 0; square < 9; square++) {
    for (let field = 0; field < 9; field++) {
      callback(sudoku[square][field]);
    }
  }
  return sudoku;
};
/*=================================================================*/
export default forEachSudokuField;