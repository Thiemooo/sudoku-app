import { Entry } from "./helpers"

const rules: Entry[] = [
  {
    title: '1:',
    content: 'Each of the 9 rows, columns and 3x3 squares must contain the numbers 1-9 only once.'
  },
  {
    title: '2:',
    content: 'If you put in an incorrect number, you lose a heart. (WIP)'
  },
  {
    title: '3:',
    content: 'If your hearts reach zero, you lose. (WIP)'
  },
];

const controls: Entry[] = [
  {
    title: 'Arrow-Keys',
    content: 'Navigate through the sudoku.'
  },
  {
    title: 'Number-Keys',
    content: 'Fill in a number you think fits.'
  },
  {
    title: 'Delete-Key',
    content: 'Removes the wrong number you filled in.'
  },
  {
    title: 'Left-Shift + Number-Key',
    content: 'Puts a notation in the field.'
  },
  {
    title: 'Left-Shift + Delete-Key',
    content: 'Removes all notations from a field.'
  },
  {
    title: 'Right-Shift',
    content: 'Toggles notation-mode.'
  },
  {
    title: 'Mouse',
    content: 'Clicking on the corresponding fields will perfom the same actions as with keyboard.'
  }
];

const getters = {
  getRules: (): Entry[]    => rules,
  getControls: (): Entry[] => controls,
};

export default {
  getters,
};

/* 
  ,
  {
    title: '',
    content: ''
  }
*/