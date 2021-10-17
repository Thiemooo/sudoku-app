import { Commit } from 'vuex';
import forEachSudokuField, { SudokoField } from './helpers';
import { FieldTypes } from './FieldInfo';
/*=================================================================*/
type SudokuState = typeof state;
/*---------------------------------*/
type ActionFieldIDs = {
  Delete: string;
  Notation: string;
  Clear: string;
}
/*=================================================================*/
const fallbackField: SudokoField = {
  fieldID: '0-0-0',
  square: 0,
  row: 0,
  column: 0,
  content: 0,
  data: 'FALLBACK-FIELD',
  hidden: true,
  wrong: false,
  wrongContent: 0,
  notations: [],
};
/*=================================================================*/
const state: {
  sudokuContent: SudokoField[][];
  numberFields:  SudokoField[];
  actionFields:  SudokoField[];
  selectedField: SudokoField;
  isFirst:       boolean;
  isNoting:      boolean;
  notations:     string[];
  ActionFieldIDs:ActionFieldIDs;
} = {
  sudokuContent: [[
    {
      fieldID: fallbackField.fieldID,
      square: 0,
      row: 0,
      column: 0,
      content: 0,
      data: FieldTypes.SudokuField,
      hidden: false,
      wrong: false,
      wrongContent: 0,
      notations: [],
    }
  ]],
  selectedField: {
    fieldID: fallbackField.fieldID,
    square: 0,
    row: 0,
    column: 0,
    content: 0,
    data: 'FIRST',
    hidden: false,
    wrong: false,
    wrongContent: 0,
    notations: [],
  },
  numberFields: [
    {
      fieldID: fallbackField.fieldID,
      square: 0,
      row: 0,
      column: 0,
      content: 0,
      data: FieldTypes.NumberField,
      hidden: false,
      wrong: false,
      wrongContent: 0,
      notations: [],
    }
  ],
  actionFields: [
    {
      fieldID: fallbackField.fieldID,
      square: 0,
      row: 0,
      column: 0,
      content: 0,
      data: FieldTypes.ActionField,
      hidden: false,
      wrong: false,
      wrongContent: 0,
      notations: [],
    }
  ],
  isFirst: true,
  isNoting: false,
  notations: [],
  ActionFieldIDs: {
    Delete: '',
    Notation: '',
    Clear: '',
  }
};
/*=================================================================*/
const getters = {
  getContent:         (state: SudokuState): SudokoField[][] => state.sudokuContent,
  getIfFirst:         (state: SudokuState): boolean         => state.isFirst,
  getSelectedField:   (state: SudokuState): SudokoField     => state.selectedField,
  getNumberFields:    (state: SudokuState): SudokoField[]   => state.numberFields,
  getActionFields:    (state: SudokuState): SudokoField[]   => state.actionFields,
  getIfIsNoting:      (state: SudokuState): boolean         => state.isNoting,
  getNotations:       (state: SudokuState): string[]        => state.notations,
  getActionFieldIDs:  (state: SudokuState): ActionFieldIDs  => state.ActionFieldIDs,
};
/*=================================================================*/
const actions = {
  createSudoku       ({ commit }: {commit: Commit}): void {

    // Create sudoku and selection fields
    const numbers                        = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const pseudoNumbers                  = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const letters1                       = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const letters2                       = ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
    const letters3                       = ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'ß'];
    const contents = numbers;
    const actionSymbol                   = ['↺', '✗', '✎°', '✎x'];
    let add                              = 0;
    let rowAdd                           = 1;
    let colAdd                           = 1;
    let shift                            = 0;
    const sudoku:       SudokoField[][]  = new Array(9);
    const numberFields: SudokoField[]    = new Array(9);
    const actionFields: SudokoField[]    = new Array(actionSymbol.length);


    for (let square = 0; square < 9; square++) {
      sudoku[square] = new Array(9);
      for (let field = 0; field < 9; field++) {                
        if (square < 3) { add = 0; }
        else if (square >= 6) { add = 7; rowAdd = 7; }
        else { add = 8; rowAdd = 4; }

        if (square % 3 == 0) colAdd = 1;
        else if (square % 3 == 2) colAdd = 7;
        else colAdd = 4;
        
        const _square = square + 1;
        const _row    = Math.floor(field/3) + rowAdd;
        const _column = field % 3 + colAdd;
        const _content = contents[(field + add + shift) % 9];
        const _data   = FieldTypes.SudokuField;

        sudoku[square][field] = {
          fieldID: `${_square}-${_row}-${_column}`,
          square: _square,
          row: _row,
          column: _column,
          content: _content,
          data: _data,
          hidden: false,
          wrong: false,
          wrongContent: 0,
          notations: [],
        }
        
        if (square == 0) {
          numberFields[field] = {
            fieldID: `0-0-${field+1}`,
            square: 0,
            row: 0,
            column: 0,
            content: contents[field],
            data: FieldTypes.NumberField,
            hidden: false,
            wrong: false,
            wrongContent: 0,
            notations: [],
          }
        }
      }
      if (square == 3 || square == 6) add = 0;
      shift += 6;
    }
    
    for (let i = 0; i < actionFields.length; i++) {
      switch(actionSymbol[i]) {
        case '✎°': commit('setNotationID', `0-0-${i+10}`); break;
        case '✗' : commit('setDeleteID', `0-0-${i+10}`);   break;
        case '✎x': commit('setClearID', `0-0-${i+10}`);    break;
      }
      actionFields[i] = {
        fieldID: `0-0-${i+10}`,
        square: 0,
        row: 0,
        column: 0,
        content: actionSymbol[i],
        data: FieldTypes.ActionField,
        hidden: false,
        wrong: false,
        wrongContent: 0,
        notations: [],
      };
    }
    commit('setSudoku', sudoku);
    commit('setNotations', pseudoNumbers);
    commit('setNumberFields', numberFields);
    commit('setActionFields', actionFields);
  },
  /*---------------------------------*/
  hideSudoku         ({ commit }: {commit: Commit}): void {
    const sudoku = getters.getContent(state);
    for (let square = 0; square < 9; square++) {
      for (let field = 0; field < 9; field++) {
        const cF: SudokoField = sudoku[square][field];
        if (Math.random() > 0.2) cF.hidden = true;
      }
    }
    
    commit('setSudoku', sudoku);
  },
  /*---------------------------------*/
  setIfIsFirst       ({ commit }: {commit: Commit}, isFirst: boolean): void {
    commit('setIsFirst', isFirst);
  },
  /*---------------------------------*/
  selectField        ({ commit }: {commit: Commit}, selectedField: SudokoField): void {
    if (selectedField.fieldID == getters.getSelectedField(state).fieldID) commit('setSelectedField', fallbackField);
    else commit('setSelectedField', selectedField);
  },
  /*---------------------------------*/
  updateSelectedField({ commit }: {commit: Commit}, newField: SudokoField): void {
    
    // If no field selected: return
    if (newField.fieldID == fallbackField.fieldID) return;

    // Else: Search and update the corresponding field in the sudoku
    const newSudoku = forEachSudokuField(getters.getContent(state), (cF) => {
      if (cF.fieldID == newField.fieldID) {
        cF.fieldID      = newField.fieldID;
        cF.square       = newField.square;
        cF.row          = newField.row;
        cF.column       = newField.column;
        cF.content      = newField.content;
        cF.data         = newField.data;
        cF.hidden       = newField.hidden;
        cF.wrong        = newField.wrong;
        cF.wrongContent = newField.wrongContent;
        cF.notations    = newField.notations;
      }
    })
    commit('setSudoku', newSudoku);
  },
  /*---------------------------------*/
  switchIfIsNoting   ({ commit }: {commit: Commit}): void {
    commit('setIfIsNoting');
  },
  /*---------------------------------*/
  changeNotations    ({ commit }: {commit: Commit}, info : { field: SudokoField, notation: string }): void {
    const index = info.field.notations.indexOf(info.notation)
    if (index > -1) info.field.notations.splice(index, 1);
    else (info.field.notations.push(info.notation));

    const newSudoku = forEachSudokuField(getters.getContent(state), (cF) => {
      if (cF.fieldID == info.field.fieldID) cF.notations = info.field.notations.sort();
    });
    commit('setSudoku', newSudoku);
  },
  /*---------------------------------*/
};
/*=================================================================*/
const mutations = {
  setSudoku:        (state: SudokuState, sudoku: SudokoField[][]): SudokoField[][]   => state.sudokuContent = sudoku,
  setIsFirst:       (state: SudokuState, isFirst: boolean): boolean                  => state.isFirst       = isFirst, 
  setSelectedField: (state: SudokuState, selectedField: SudokoField): SudokoField    => state.selectedField = selectedField,
  setNumberFields:  (state: SudokuState, numberFields: SudokoField[]): SudokoField[] => state.numberFields  = numberFields,
  setActionFields:  (state: SudokuState, actionFields: SudokoField[]): SudokoField[] => state.actionFields  = actionFields,
  setNotations:     (state: SudokuState, notations: string[]): string[]              => state.notations     = notations, 
  setIfIsNoting:    (state: SudokuState): boolean                                    => state.isNoting      = !state.isNoting,
  setDeleteID:      (state: SudokuState, deleteID: string): string                   => state.ActionFieldIDs.Delete = deleteID,
  setNotationID:    (state: SudokuState, notationID: string): string                 => state.ActionFieldIDs.Notation = notationID,
  setClearID:       (state: SudokuState, clearID: string): string                    => state.ActionFieldIDs.Clear = clearID,
}
/*=================================================================*/
export default {
  state,
  getters,
  actions,
  mutations,
}