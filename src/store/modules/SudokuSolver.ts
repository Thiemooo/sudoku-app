const solved = new Array(9);
const allSolutions: number[][][] = new Array(0);

for (let i = 0; i < 9; i++) {
  solved[i] = new Array(9);
  for (let j = 0; j < 9; j++)
    solved[i][j] = 0;
}

function _possible(sudoku: number[][], y: number, x: number, n: number) {
  for (let i = 0; i < 9; i++) 
    if (sudoku[y][i] == n) 
      return false;
  
  for (let i = 0; i < 9; i++)
    if (sudoku[i][x] == n)
      return false;

  const x0 = (Math.floor(x/3)) * 3
  const y0 = (Math.floor(y/3)) * 3

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (sudoku[y0+i][x0+j] == n)
        return false;
  
  return true;
}

function _solve() {
  for (let y = 0; y < 9; y++)
    for (let x = 0; x < 9; x++)
      if (solved[y][x] == 0) {
        for (let n = 1; n < 10; n++) 
          if (_possible(solved, y, x, n)) {
            solved[y][x] = n;
            _solve();
            solved[y][x] = 0;
          }
        return;
      }
  const newSolution = new Array(9);
    for (let i = 0; i < 9; i++) {
      newSolution[i] = new Array(9);
      for (let j = 0; j < 9; j++)
        newSolution[i][j] = solved[i][j];
    }
  allSolutions.push(newSolution);
}

function solve(sudoku: number[][]) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++)
      solved[i][j] = sudoku[i][j];
  }
  _solve();
  console.log(allSolutions.length + " possibilities.");
  return allSolutions;
}
export default solve;