import { Entry } from "./helpers"

const rules: Entry[] = [
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

const controls: Entry[] = [
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