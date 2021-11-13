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
/*=================================================================*/
function forEachSudokuField(sudoku: SudokuField[][], callback: { (field: SudokuField): void} ): SudokuField[][] {
  
  // Run the callback function on every field of the sudoku
  for (let square = 0; square < 9; square++) {
    for (let field = 0; field < 9; field++) {
      callback(sudoku[square][field]);
    }
  }
  return sudoku;
}
/*=================================================================*/
function shuffleArray(arr: number[] | string[]) {
  let currentIndex = arr.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex], arr[currentIndex]];
  }

  return arr;
}
/*=================================================================*/
export {
  forEachSudokuField,
  shuffleArray
}
/*=================================================================*/