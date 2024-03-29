import { Commit, Dispatch } from 'vuex';
import { SudokuField, Language } from './types';
import { forEachSudokuField/*, shuffleArray*/, calcFieldWidth } from './helpers';
import { FieldTypes } from './FieldInfo';
import LinkedList, { LinkedListNode } from './LinkedList';
import { solve, createBoilerplate } from './SudokuSolver';
import Time from './Time';
import { colorThemes } from './ColorHandler';
import { getLanguage } from './Languages';

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
  allSolutions:     number[][][];
  solutionCount:    number;
  boilerplate:      number[][];
  sudokuContent:    SudokuField[][];
  numberTracker:  number[]
  numberFields:     SudokuField[];
  actionFields:     SudokuField[];
  selectedField:    SudokuField;
  isShowing:        boolean;
  isNoting:         boolean;
  notations:        string[];
  ActionFieldIDs:   ActionFieldIDs;
  steps:            LinkedList;
  time:             Time;
  finished:         boolean;
  fieldWidth:       string;
  height:           string;
  finishedNumbers:  number[];
  selectedLanguage: Language;
} = {
  allSolutions: [],
  solutionCount: 0,
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
  numberTracker: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
  isShowing: false,
  isNoting: false,
  notations: [],
  ActionFieldIDs: {
    Undo: '',
    Delete: '',
    Notation: '',
    Clear: '',
  },
  steps: new LinkedList(),
  time: new Time(),
  finished: false,
  fieldWidth: '50', 
  height: '650px',
  finishedNumbers: [],
  selectedLanguage: getLanguage('en'),
};
/*=================================================================*/
const getters = {
  getContent:         (state: SudokuState): SudokuField[][] => state.sudokuContent,
  getIfShowing:       (state: SudokuState): boolean         => state.isShowing,
  getSelectedField:   (state: SudokuState): SudokuField     => state.selectedField,
  getNumberFields:    (state: SudokuState): SudokuField[]   => state.numberFields,
  getActionFields:    (state: SudokuState): SudokuField[]   => state.actionFields,
  getIfIsNoting:      (state: SudokuState): boolean         => state.isNoting,
  getNotations:       (state: SudokuState): string[]        => state.notations,
  getActionFieldIDs:  (state: SudokuState): ActionFieldIDs  => state.ActionFieldIDs,
  getSteps:           (state: SudokuState): LinkedList      => state.steps,
  getTime:            (state: SudokuState): Time            => state.time,
  getFieldWidth:      (state: SudokuState): string          => state.fieldWidth,
  getSudokuHeight:    (state: SudokuState): string          => state.height,
  getNumberTracker:   (state: SudokuState): number[]        => state.numberTracker,
  getFinishedNumbers: (state: SudokuState): number[]        => state.finishedNumbers,
  getIfFinished:      (state: SudokuState): boolean         => state.finished,
  getAPP:             (state: SudokuState): typeof state.selectedLanguage.app      => state.selectedLanguage.app,
  getHOME:            (state: SudokuState): typeof state.selectedLanguage.home     => state.selectedLanguage.home,
  getSETTINGS:        (state: SudokuState): typeof state.selectedLanguage.settings => state.selectedLanguage.settings,
  getHTP:             (state: SudokuState): typeof state.selectedLanguage.htp      => state.selectedLanguage.htp,
  getGAME:            (state: SudokuState): typeof state.selectedLanguage.game     => state.selectedLanguage.game,
  getFINISHED:        (state: SudokuState): typeof state.selectedLanguage.finished => state.selectedLanguage.finished,
  getSolutionCount:   (state: SudokuState): number                                 => state.solutionCount,
};
/*=================================================================*/
const actions = {
  async createSudoku       ({ commit }: {commit: Commit}, difficulty = 'easy'): Promise<void> {
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
    const boilerPlate = await createBoilerplate(difficulty);
    console.log(boilerPlate);
    const allSolutions = solve(boilerPlate);
    console.log("There are " + allSolutions.length + " possible solutions for this sudoku (difficulty: " + difficulty + ").");

    // Setting up Sudoku for website
    const numberTracker = state.numberTracker
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

        numberTracker[boilerPlate[_row-1][_column-1]]++;
      }
    }

    // console.log(allSolutions);

    state.time.restart();

    commit('setBoilerplate', boilerPlate);
    commit('setSudoku', sudoku);
    commit('setShow', true);
    commit('setSelectedField', fallbackField);
    commit('setNumberFields', numberFields);
    commit('setActionFields', actionFields);
    commit('setNotations', pseudoNumbers);
    commit('setFinished', false);
    commit('setNumberTracker', numberTracker);
    commit('setFinishedNumbers', []);
    commit('setSolutionCount', 0);
    
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
  show               ({ commit }: {commit: Commit}, show = true): void {
    commit('setShow', show);
  },
  /*---------------------------------*/
  selectField        ({ commit }: {commit: Commit}, selectedField: SudokuField): void {
    if (selectedField.fieldID == state.selectedField.fieldID) commit('setSelectedField', fallbackField);
    else commit('setSelectedField', selectedField);
  },
  /*---------------------------------*/
  onArrowKeyDown     ({ commit }: {commit: Commit}, key: string): void {
    let selectedField    = state.selectedField;
    
    if ((selectedField.row    == 1 && key == 'ArrowUp')   ||
        (selectedField.row    == 9 && key == 'ArrowDown') ||
        (selectedField.column == 1 && key == 'ArrowLeft') ||
        (selectedField.column == 9 && key == 'ArrowRight')  ) {
      // If trying to go out of Sudoku
      return;
    }

    let rowAdd = 0;
    let colAdd = 0;

    switch (key) {
      case 'ArrowLeft':  colAdd = -1; break;
      case 'ArrowUp':    rowAdd = -1; break;
      case 'ArrowRight': colAdd =  1; break;
      case 'ArrowDown':  rowAdd =  1; break;
    }
    
    const newRow = selectedField.row    + rowAdd;
    const newCol = selectedField.column + colAdd;

    forEachSudokuField(state.sudokuContent, (cF) => {
      if (cF.row == newRow && cF.column == newCol) {
        selectedField = cF;
      }
    });

    commit('setSelectedField', selectedField); 
  },
  /*---------------------------------*/
  updateSelectedField({ commit }: {commit: Commit }, data: { newField: SudokuField, onAction: boolean }): void {
    if (state.finished) {
      console.log("Finished the sudoku in " + state.time.minutes().toString() + " minutes and " + (state.time.seconds()%60).toString() + " seconds! Great job!");
      return;
    }
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
          const finishedNumbers = [];
          const numberTracker = state.numberTracker;          
      
          for (let i = 1; i <= 9; i++) {
            if (numberTracker[i] >= 9) {
              finishedNumbers.push(i);
              commit('setFinishedNumbers', finishedNumbers);
            }
          }
                    
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
      commit('setSolutionCount', allSolutions.length);
      
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

    let finished = true;
    forEachSudokuField(newSudoku, (cF) => {
      if (cF.hidden) finished = false;
    });
    if (finished) {
      state.time.pause();
      setTimeout(() => {
        commit('setFinished', true);
        setTimeout(() => {
          commit('setFinished', false);
        }, 1000);
      }, 500);
    }
  },
  /*---------------------------------*/
  switchIfIsNoting   ({ commit }: {commit: Commit}): void {
    commit('switchNoting');
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
  refreshSize        ({ commit }: {commit: Commit}, sHeight: number): void {
    commit('setFieldWidth', calcFieldWidth());
    commit('setHeight',     `${sHeight}px`);
  },
  updateNumberTracker({ commit }: {commit: Commit}, nT: number[]): void {
    commit('setNumberTracker', nT);
  },
  setColorTheme(x: any, colorTheme = 0): void {
    for (let i = 0; i < colorThemes[0].content.length; i++) {
      document.documentElement.style.setProperty(`--${colorThemes[colorTheme-1].content[i].title}`, colorThemes[colorTheme-1].content[i].content);
    }
  },
  selectLanguage     ({ commit }: {commit: Commit}, abbreviation: string): void {
    commit('setLanguage', getLanguage(abbreviation));
  }
};
/*=================================================================*/
const mutations = {
  setBoilerplate:     (state: SudokuState, boilerplate: number[][]): number[][]        => state.boilerplate   = boilerplate,
  setSudoku:          (state: SudokuState, sudoku: SudokuField[][]): SudokuField[][]   => state.sudokuContent = sudoku,
  setShow:            (state: SudokuState, show: boolean): boolean                     => state.isShowing     = show, 
  setSelectedField:   (state: SudokuState, selectedField: SudokuField): SudokuField    => state.selectedField = selectedField,
  setNumberFields:    (state: SudokuState, numberFields: SudokuField[]): SudokuField[] => state.numberFields  = numberFields,
  setActionFields:    (state: SudokuState, actionFields: SudokuField[]): SudokuField[] => state.actionFields  = actionFields,
  setNotations:       (state: SudokuState, notations: string[]): string[]              => state.notations     = notations, 
  switchNoting:       (state: SudokuState): boolean                                    => state.isNoting      = !state.isNoting,
  setUndoID:          (state: SudokuState, undoID: string): string                     => state.ActionFieldIDs.Undo = undoID,
  setDeleteID:        (state: SudokuState, deleteID: string): string                   => state.ActionFieldIDs.Delete = deleteID,
  setNotationID:      (state: SudokuState, notationID: string): string                 => state.ActionFieldIDs.Notation = notationID,
  setClearID:         (state: SudokuState, clearID: string): string                    => state.ActionFieldIDs.Clear = clearID,
  insertStep:         (state: SudokuState, newStep: LinkedListNode): LinkedList        => state.steps.insert(newStep),
  popStep:            (state: SudokuState): LinkedList                                 => state.steps.pop(),
  deleteSteps:        (state: SudokuState, id: string): LinkedList                     => state.steps.delete(id),
  setFinished:        (state: SudokuState, finished: boolean): boolean                 => state.finished        = finished,  
  setFieldWidth:      (state: SudokuState, width: string): string                      => state.fieldWidth      = width, 
  setHeight:          (state: SudokuState, height: string): string                     => state.height          = height,
  setNumberTracker:   (state: SudokuState, nT: number[]): number[]                     => state.numberTracker   = nT,
  setFinishedNumbers: (state: SudokuState, fN: number[]): number[]                     => state.finishedNumbers = fN,
  setLanguage:        (state: SudokuState, L: Language): Language                      => state.selectedLanguage= L,
  setSolutionCount:   (state: SudokuState, c: number): number                          => state.solutionCount   = c,
}
/*=================================================================*/
export default {
  state,
  getters,
  actions,
  mutations,
}