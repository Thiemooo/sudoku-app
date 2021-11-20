import { Commit, Dispatch } from 'vuex';
import { SudokuField, forEachSudokuField/*, shuffleArray*/ } from './helpers';
import { FieldTypes } from './FieldInfo';
import LinkedList, { LinkedListNode } from './LinkedList';
import { solve, createBoilerplate } from './SudokuSolver';

/*=================================================================*/
type SudokuState = typeof state;
/*---------------------------------*/
type ActionFieldIDs = {
  Undo: string;
  Delete: string;
  Notation: string;
  Clear: string;
}
/*=================================================================*/
const fallbackField: SudokuField = {
  fieldID: '0-0-0',
  square: 0,
  row: 0,
  column: 0,
  content: 0,
  possibleContents: [0],
  data: 'FALLBACK-FIELD',
  hidden: true,
  wrong: false,
  wrongContent: 0,
  notations: [],
};
/*=================================================================*/
const state: {
  allSolutions:    number[][][];
  boilerplate:     number[][];
  sudokuContent:   SudokuField[][];
  numberFields:    SudokuField[];
  actionFields:    SudokuField[];
  selectedField:   SudokuField;
  isFirst:         boolean;
  isNoting:        boolean;
  notations:       string[];
  ActionFieldIDs:  ActionFieldIDs;
  steps:           LinkedList;
} = {
  allSolutions: [],
  boilerplate: [],
  sudokuContent: [[
    {
      fieldID: fallbackField.fieldID,
      square: 0,
      row: 0,
      column: 0,
      content: 0,
      possibleContents: [0],
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
    possibleContents: [0],
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
      possibleContents: [0],
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
      possibleContents: [0],
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
    Undo: '',
    Delete: '',
    Notation: '',
    Clear: '',
  },
  steps: new LinkedList(),
};
/*=================================================================*/
const getters = {
  getContent:         (state: SudokuState): SudokuField[][] => state.sudokuContent,
  getIfFirst:         (state: SudokuState): boolean         => state.isFirst,
  getSelectedField:   (state: SudokuState): SudokuField     => state.selectedField,
  getNumberFields:    (state: SudokuState): SudokuField[]   => state.numberFields,
  getActionFields:    (state: SudokuState): SudokuField[]   => state.actionFields,
  getIfIsNoting:      (state: SudokuState): boolean         => state.isNoting,
  getNotations:       (state: SudokuState): string[]        => state.notations,
  getActionFieldIDs:  (state: SudokuState): ActionFieldIDs  => state.ActionFieldIDs,
  getSteps:           (state: SudokuState): LinkedList      => state.steps,
};
/*=================================================================*/
const actions = {
  async createSudoku       ({ commit }: {commit: Commit}): Promise<void> {
    const pseudoNumbers                  = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const sudoku:       SudokuField[][]  = new Array(9);
    const sudokuContent: number[][]      = new Array(9);
    const numberFields: SudokuField[]    = new Array(9);
    const actionSymbol                   = ['↺', '✗', '✎°', '✎x'];
    const actionFields: SudokuField[]    = new Array(actionSymbol.length);
    let rowAdd                           = 1;
    let colAdd                           = 1;

    // const boilerPlate = [
    //     [5, 3, 0,   0, 7, 0,   0, 0, 0],
    //     [0, 0, 0,   1, 9, 5,   0, 0, 0],
    //     [0, 9, 8,   0, 0, 0,   0, 6, 0],
    
    //     [8, 0, 0,   0, 0, 0,   0, 0, 3],
    //     [4, 0, 0,   0, 0, 0,   0, 0, 1],
    //     [7, 0, 0,   0, 0, 0,   0, 0, 6],
    
    //     [0, 6, 0,   0, 0, 0,   2, 8, 0],
    //     [0, 0, 0,   4, 1, 9,   0, 0, 5],
    //     [0, 0, 0,   0, 8, 0,   0, 7, 9],
    //   ];

    // Setting up actionfields
    for (let i = 0; i < actionFields.length; i++) {
      switch(actionSymbol[i]) {
        case '↺':  commit('setUndoID', `0-0-${i+10}`);     break;
        case '✎°': commit('setNotationID', `0-0-${i+10}`); break;
        case '✗' : commit('setDeleteID', `0-0-${i+10}`);   break;
        case '✎x': commit('setClearID', `0-0-${i+10}`);    break;
      }
      actionFields[i] = {
        fieldID: `0-0-${i+10}`,
        square: 0,
        row: 0,
        possibleContents: [],
        column: 0,
        content: actionSymbol[i],
        data: FieldTypes.ActionField,
        hidden: false,
        wrong: false,
        wrongContent: 0,
        notations: [],
      };
    }
    // Setting up numberfields and empty sudoku
    for (let i = 0; i < 9; i++) {
      sudokuContent[i] = new Array(9);
      for (let j = 0; j < 9; j++) {
        sudokuContent[i][j] = 0;
      }
      numberFields[i] = {
        fieldID: `0-0-${i+1}`,
        square: 0,
        row: 0,
        column: 0,
        content: i+1,
        possibleContents: [],
        data: FieldTypes.NumberField,
        hidden: false,
        wrong: false,
        wrongContent: 0,
        notations: [],
      }
    }

    
    // Computing Sudoku (API)
    const boilerPlate = await createBoilerplate();
    console.log(boilerPlate);
    const allSolutions = solve(boilerPlate);
    console.log(allSolutions.length + " possibilities.");

    // Setting up Sudoku for website
    for (let square = 0; square < 9; square++) {
      sudoku[square] = new Array(9);
      for (let field = 0; field < 9; field++) {   
        if (square < 3) rowAdd = 1;
        else if (square >= 6) rowAdd = 7;
        else rowAdd = 4; 

        if (square % 3 == 0) colAdd = 1;
        else if (square % 3 == 2) colAdd = 7;
        else colAdd = 4;
        
        const _square  = square + 1;
        const _row     = Math.floor(field/3) + rowAdd;
        const _column  = field % 3 + colAdd;
        const _data    = FieldTypes.SudokuField;
        const _possibleContents = [];
        
        for (let i = 0; i < allSolutions.length; i++)
          if (_possibleContents.indexOf(allSolutions[i][_row-1][_column-1]) == -1) 
            _possibleContents.push(allSolutions[i][_row-1][_column-1]);

        sudoku[square][field] = {
          fieldID: `${_square}-${_row}-${_column}`,
          square: _square,
          row: _row,
          column: _column,
          content: boilerPlate[_row-1][_column-1],
          possibleContents: _possibleContents,
          data: _data,
          hidden: boilerPlate[_row-1][_column-1] == 0,
          wrong: false,
          wrongContent: 0,
          notations: [],
        }
      }
    }

    // console.log(allSolutions);

    commit('setSudoku', sudoku);
    commit('setBoilerplate', boilerPlate);
    commit('setNotations', pseudoNumbers);
    commit('setNumberFields', numberFields);
    commit('setActionFields', actionFields);

    // Create sudoku and selection fields
    // const numbers                        = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // const pseudoNumbers                  = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // const contents = numbers;
    // const suffledContents = shuffleArray([...numbers]);
    // const actionSymbol                   = ['↺', '✗', '✎°', '✎x'];
    // let add                              = 0;
    // let rowAdd                           = 1;
    // let colAdd                           = 1;
    // let shift                            = 0;
    // const sudoku:       SudokuField[][]  = new Array(9);
    // const numberFields: SudokuField[]    = new Array(9);
    // const actionFields: SudokuField[]    = new Array(actionSymbol.length);


    // for (let square = 0; square < 9; square++) {
    //   sudoku[square] = new Array(9);
    //   for (let field = 0; field < 9; field++) {                
    //     if (square < 3) { add = 0; }
    //     else if (square >= 6) { add = 7; rowAdd = 7; }
    //     else { add = 8; rowAdd = 4; }

    //     if (square % 3 == 0) colAdd = 1;
    //     else if (square % 3 == 2) colAdd = 7;
    //     else colAdd = 4;
        
    //     const _square = square + 1;
    //     const _row    = Math.floor(field/3) + rowAdd;
    //     const _column = field % 3 + colAdd;
    //     const _content = suffledContents[(field + add + shift) % 9];
    //     const _data   = FieldTypes.SudokuField;

    //     sudoku[square][field] = {
    //       fieldID: `${_square}-${_row}-${_column}`,
    //       square: _square,
    //       row: _row,
    //       column: _column,
    //       content: _content,
    //       data: _data,
    //       hidden: false,
    //       wrong: false,
    //       wrongContent: 0,
    //       notations: [],
    //     }
        
    //     if (square == 0) {
    //       numberFields[field] = {
    //         fieldID: `0-0-${field+1}`,
    //         square: 0,
    //         row: 0,
    //         column: 0,
    //         content: contents[field],
    //         data: FieldTypes.NumberField,
    //         hidden: false,
    //         wrong: false,
    //         wrongContent: 0,
    //         notations: [],
    //       }
    //     }
    //   }
    //   if (square == 3 || square == 6) add = 0;
    //   shift += 6;
    // }
    
    // for (let i = 0; i < actionFields.length; i++) {
    //   switch(actionSymbol[i]) {
    //     case '↺':  commit('setUndoID', `0-0-${i+10}`);     break;
    //     case '✎°': commit('setNotationID', `0-0-${i+10}`); break;
    //     case '✗' : commit('setDeleteID', `0-0-${i+10}`);   break;
    //     case '✎x': commit('setClearID', `0-0-${i+10}`);    break;
    //   }
    //   actionFields[i] = {
    //     fieldID: `0-0-${i+10}`,
    //     square: 0,
    //     row: 0,
    //     column: 0,
    //     content: actionSymbol[i],
    //     data: FieldTypes.ActionField,
    //     hidden: false,
    //     wrong: false,
    //     wrongContent: 0,
    //     notations: [],
    //   };
    // }
    // commit('setSudoku', sudoku);
    // commit('setNotations', pseudoNumbers);
    // commit('setNumberFields', numberFields);
    // commit('setActionFields', actionFields);
  },
  /*---------------------------------*/
  setIfIsFirst       ({ commit }: {commit: Commit}, isFirst: boolean): void {
    commit('setIsFirst', isFirst);
  },
  /*---------------------------------*/
  selectField        ({ commit }: {commit: Commit}, selectedField: SudokuField): void {
    if (selectedField.fieldID == state.selectedField.fieldID) commit('setSelectedField', fallbackField);
    else commit('setSelectedField', selectedField);
  },
  /*---------------------------------*/
  updateSelectedField({ commit }: {commit: Commit }, data: { newField: SudokuField, onAction: boolean }): void {
    
    // If no field selected: return
    if (data.newField.fieldID == fallbackField.fieldID) return;
    
    const boilerPlate = state.boilerplate;
    
    let allSolutions: number[][][];
    // Else: Search and update the corresponding field in the sudoku
    const newSudoku = forEachSudokuField(state.sudokuContent, (cF) => {
      if (cF.fieldID == data.newField.fieldID) {
        cF.content          = data.newField.content;
        cF.hidden           = data.newField.hidden;
        cF.wrong            = data.newField.wrong;
        cF.wrongContent     = data.newField.wrongContent;
        cF.notations        = data.newField.notations;
        
        if (!data.newField.wrong) {
          boilerPlate[cF.row-1][cF.column-1] = parseInt(data.newField.content.toString());
        }
        commit('setBoilerplate',  boilerPlate);
      }
    });

    if (!data.onAction && !data.newField.wrong) {
      /*
       * If the newfield is correct:
       * Compute possibleContents for every other field and new allSolutions
      */

      allSolutions = solve(boilerPlate);
      // console.log(allSolutions);
      console.log(allSolutions.length + " possibilities.");
      
      const sudoku = forEachSudokuField(newSudoku, (cF) => {
        if (cF.content == 0) {
          const _possibleContents: number[] = [];
          for (let i = 0; i < allSolutions.length; i++)
            if (_possibleContents.indexOf(allSolutions[i][cF.row-1][cF.column-1]) == -1) 
              _possibleContents.push(allSolutions[i][cF.row-1][cF.column-1]);
          
          cF.possibleContents = _possibleContents;
        }
      });
      commit('setSudoku', sudoku);
    }
    else {
      const newStep = new LinkedListNode(data.newField.fieldID, data.newField.wrongContent);
      
      if (!data.newField.hidden)                    commit('deleteSteps', data.newField.fieldID);
      else if (!newStep.equals(state.steps.last())) commit('insertStep', newStep);
      
      commit('setSudoku', newSudoku);
    }
  },
  /*---------------------------------*/
  switchIfIsNoting   ({ commit }: {commit: Commit}): void {
    commit('setIfIsNoting');
  },
  /*---------------------------------*/
  changeNotations    ({ commit }: {commit: Commit}, info : { field: SudokuField, notation: string }): void {
    const index = info.field.notations.indexOf(info.notation)
    if (index > -1) info.field.notations.splice(index, 1);
    else (info.field.notations.push(info.notation));

    const newSudoku = forEachSudokuField(state.sudokuContent, (cF) => {
      if (cF.fieldID == info.field.fieldID) cF.notations = info.field.notations.sort();
    });
    commit('setSudoku', newSudoku);
  },
  /*---------------------------------*/
  undoStep           ({ commit, dispatch }: {commit: Commit, dispatch: Dispatch}): void {
    const deletedField = state.steps.last();  // Field that is going to be deleted
    
    if (deletedField == null) return;         // If the LinkedList is empty: return

    commit('popStep');                        // Else: Delete last step ...

    let toRecreateField: LinkedListNode | null  = new LinkedListNode(deletedField.id, deletedField.content);  // Init field that is going to be recreated
    if (state.steps.search(toRecreateField.id) == null) toRecreateField.content = 0;    // If there is no entry for the id, initiate the clear of that field
    else toRecreateField = state.steps.last();                                          // Else get the new last field
    const newSudoku = forEachSudokuField(state.sudokuContent, (cF) => {                 // Update the field
      if (cF.fieldID == toRecreateField?.id) {
        if (toRecreateField?.content == 0) {
          cF.wrong = false;
          cF.wrongContent = '';
        }
        else cF.wrongContent = toRecreateField?.content;
        
        if (state.selectedField != cF) dispatch('selectField', cF);                     // Select re-created field, if not yet selected
      }
    });
    commit('setSudoku', newSudoku);                                                     // Update the Sudoku for re-rendering
  },
  /*---------------------------------*/
};
/*=================================================================*/
const mutations = {
  setBoilerplate:     (state: SudokuState, boilerplate: number[][]): number[][]        => state.boilerplate   = boilerplate,
  setSudoku:          (state: SudokuState, sudoku: SudokuField[][]): SudokuField[][]   => state.sudokuContent = sudoku,
  setIsFirst:         (state: SudokuState, isFirst: boolean): boolean                  => state.isFirst       = isFirst, 
  setSelectedField:   (state: SudokuState, selectedField: SudokuField): SudokuField    => state.selectedField = selectedField,
  setNumberFields:    (state: SudokuState, numberFields: SudokuField[]): SudokuField[] => state.numberFields  = numberFields,
  setActionFields:    (state: SudokuState, actionFields: SudokuField[]): SudokuField[] => state.actionFields  = actionFields,
  setNotations:       (state: SudokuState, notations: string[]): string[]              => state.notations     = notations, 
  setIfIsNoting:      (state: SudokuState): boolean                                    => state.isNoting      = !state.isNoting,
  setUndoID:          (state: SudokuState, undoID: string): string                     => state.ActionFieldIDs.Undo = undoID,
  setDeleteID:        (state: SudokuState, deleteID: string): string                   => state.ActionFieldIDs.Delete = deleteID,
  setNotationID:      (state: SudokuState, notationID: string): string                 => state.ActionFieldIDs.Notation = notationID,
  setClearID:         (state: SudokuState, clearID: string): string                    => state.ActionFieldIDs.Clear = clearID,
  insertStep:         (state: SudokuState, newStep: LinkedListNode): LinkedList        => state.steps.insert(newStep),
  popStep:            (state: SudokuState): LinkedList                                 => state.steps.pop(),
  deleteSteps:        (state: SudokuState, id: string): LinkedList                     => state.steps.delete(id),
}
/*=================================================================*/
export default {
  state,
  getters,
  actions,
  mutations,
}