
var candyPoints = [];
var playing = true;
var play;

var init = function () {
  startTimer();
  setCandys();
  setDroppable();
  intervalManager(true, initGame, 2500);
}

function intervalManager(flag, func, time) {
  var intervalID = null;
  if (flag){
    intervalID = setInterval(func, time);
  }else{
    console.log('clear '+intervalID);
    clearInterval(intervalID);
  }
}

var initGame = function () {
  setTimeout(function () {
    checkRows();
    checkColums();
  }, 1000);
}

function endGame() {
  console.log("fin de juego");
}

function setDroppable() {
  $("div[class^='col']").droppable({
    accept: '.candy',
    drop: function (event, ui) {
      $(this).html($(this).attr('class'));
      $(ui.draggable).removeClass('candy');
    }
  });
}

function setCandys() {
  for (var row = 1; row < 8; row++) {
    for (var col = 1; col < 8; col++) {
      var img = Math.floor((Math.random() * 4) + 1);
      $('.row-' + row).find('.col-' + col).html('<img name=' + img + ' class="candy" src="image/' + img + '.png"></img>');
    }
  }
  $('.panel-tablero img').draggable();
  setTimeout(function () { $('.panel-tablero img').show('slide', { direction: "up" }, 800); }, 200);
}

function setCandy(row, col, action) {
  var columnSel = $('.row-' + row).find('.col-' + col);
  if (action == 'c') {
    var img = Math.floor((Math.random() * 4) + 1);
    columnSel.html('<img name=' + img + ' class="candy" src="image/' + img + '.png"></img>');
  } else if (action == 'm') {
    var rowAnt = parseInt(row) - 1;
    $('.row-' + rowAnt).find('.col-' + col).find('img').appendTo(columnSel).hide().show('slide', { direction: "up" }, 900);
  }
  setTimeout(function () { columnSel.find('img').show('slide', { direction: "up" }, 500); }, 200);
  columnSel.find('img').draggable();
}

function checkRows() {
  for (var row = 1; row < 8; row++) {
    for (var col = 1; col < 8; col++) {
      var candy = getCandy(row, col);
      if (col < 7) {
        for (var x = 1; x < 8; x++) {
          if (candy == getCandy(row, col + x) && candy == getCandy(row, col + x + 1)) {
            if (candy == getCandy(row, col + x + 2)) {
              plusPoints(row, col, 'row', col + 4);
              col += 4;
              break;
            } else {
              plusPoints(row, col, 'row', col + 3);
              col += 3;
              break;
            }
          }
          break;
        }
      }
    }
  }
}

function checkColums() {
  for (var col = 1; col < 8; col++) {
    for (var row = 1; row < 8; row++) {
      var candy = getCandy(row, col);
      if (row < 7) {
        for (var x = 1; x < 8; x++) {
          if (candy == getCandy(row + x, col) && candy == getCandy(row + x + 1, col)) {
            if (candy == getCandy(row + x + 2, col)) {
              plusPoints(row, col, 'col', row + 4);
              row += 4;
              break;
            } else {
              plusPoints(row, col, 'col', row + 3);
              row += 3;
              break;
            }
          }
          break;
        }
      }
    }
  }
  finishChecking();
}

function plusPoints(row, col, dir, num) {
  if (dir == 'row') {
    for (var i = col; i < num; i++) {
      candyPoints.push($('.row-' + row).find('.col-' + i));
      //sumar puntos
    }
  } else {
    for (var i = row; i < num; i++) {
      candyPoints.push($('.row-' + i).find('.col-' + col));
      //sumar puntos
    }
  }
}

function finishChecking() {
  $.each(candyPoints, function (idx, val) {
    val.effect("pulsate", 1500);
    setTimeout(function () {
      val.html('');
      moveCandy();
    }, 1500);
  });
  candyPoints = [];
}

function moveCandy() {
  var boardEmty = true;
  var hollow = false;
  while (boardEmty) {
    boardEmty = false;
    for (var row = 1; row < 8; row++) {
      for (var col = 1; col < 8; col++) {
        var candy = $('.row-' + row).find('.col-' + col).find('img');
        if (!candy.length) {
          if (row == 1) {
            setCandy(row, col, 'c');
          } else {
            setCandy(row, col, 'm');
            boardEmty = true;
          }
        }
      }
    }
  }
  intervalManager(false);
}

function getCandy(row, col) {
  return $('.row-' + row).find('.col-' + col).find('img').attr('name');
}

var Game = (function () {

})();
