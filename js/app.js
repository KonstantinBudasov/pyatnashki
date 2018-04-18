var puzzle = {
  settings: {
    boardId: 'board',
    boardWidth: '192px',
    cellsAmount: 16,
    cellClassName: 'puzzle-cell'
  },
  createCellMarkup: function(id, text, orderAttr, boardSelector) {
    var cell = document.createElement('span');

    cell.id = id;
    cell.className = puzzle.settings.cellClassName;
    cell.setAttribute('cell-order', orderAttr);
    cell.innerHTML = text || '';
    boardSelector.appendChild(cell);
  },
  renderCells: function(array, settings) {
    var amount = settings.cellsAmount || puzzle.settings.cellsAmount;
    var board = document.getElementById(settings.boardId) || document.getElementById(puzzle.settings.boardId);
    var boardWidth = settings.boardWidth || puzzle.settings.boardWidth;
    var cells = document.getElementsByClassName(puzzle.settings.cellClassName);

    if(board !== 'undefined'){
      board.style.width = boardWidth;
      for(i = 0; i < amount; i++) {
        if(i === 0) {
          puzzle.createCellMarkup('empty-cell', '', '', board);
          continue;
        }
        puzzle.createCellMarkup('board-cell-' + i, i, i, board);
      }
    } else {
      console.log('Use existing container with unique ID to render puzzle');
    }

    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function(){
        puzzle.onCellClick();
      });
    }
  },
  shuffleCells: function() {
    var board = document.getElementById(puzzle.settings.boardId);

    for (var i = board.children.length; i >= 0; i--) {
      board.appendChild(board.children[Math.random() * i | 0]);
    }
  },
  onCellClick: function() {
    puzzle.checkWinningCombination();
  },
  checkWinningCombination: function() {
    var cells = document.getElementsByClassName(puzzle.settings.cellClassName);
    var rangeMin = 1;
    var rangeMax = puzzle.settings.cellsAmount;
    var winningCombination = [];
    var currentCellsOrder = [];
    var isWin;

    while(rangeMin < rangeMax){
      winningCombination.push(rangeMin++);
    }

    for(var i = 0; i < cells.length; i++) {
      if(i !== 0){
        currentCellsOrder.push(Number(cells[i].getAttribute('cell-order')));
      }
    }

    // Compare winning combinations
    JSON.stringify(winningCombination) === JSON.stringify(currentCellsOrder) ? isWin = true : isWin = false;

    if(isWin === true) {
      alert('Congratulations, you\'ve won');
    }

    console.log('is Win', isWin);
  },
  init: function(settings) {
    // If initialized without settings, render with default,
    // otherwise using object from argument
    if(typeof settings === 'undefined') {
      puzzle.renderCells([], puzzle.settings);
    } else {
      puzzle.renderCells([], settings);
    }
    puzzle.shuffleCells();
  }
};