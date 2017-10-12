
$('.btn-reinicio').click(function (e) {
  if ($(this).html() == 'Iniciar') {
    $(this).html('Reiniciar');
    Game.init();
  } else {
    location.reload();
  }
});

var Game = (function () {
  var candyPoints = [];
  var playing = true;
  var play;
  var intervalID = null;
  var points = 0;
  var goodMov = false;
  var candyAct = {};
  var candyV = {};
  var movements = 0;

  var init = function () {
    $('#timer').html('2:00');
    setInterval(startTimer, 1000);
    setCandys();
    setDroppable();
    initGame();
    intervalManager('titulo', pulsate, 500);
  }

  function intervalManager(flag, func, time) {
    if (flag) {
      intervalID = setInterval(func, time);
      console.log('init ' + intervalID);
    } else {
      console.log('clear ' + intervalID);
      clearInterval(intervalID);
    }
  }

  var initGame = function () {
    setTimeout(function () {
      checkRows();
      checkColums();
    }, 800);
  }

  function pulsate() {
    if ($('.main-titulo').css('color') == "rgb(255, 255, 255)") {
      $('.main-titulo').css('color', '#DCFF0E');
    } else {
      $('.main-titulo').css('color', 'white');
    }

  }

  function setDroppable() {
    $("div[class^='col']").droppable({
      accept: ".candy",
      drop: function (event, ui) {

        var colAct = $(this).attr('class').split(' ')[0].split('-')[1];
        var rowAct = $(this).parent().attr('class').split('-')[1];
        var colV = $(ui.draggable).parent().attr('class').split(' ')[0].split('-')[1];
        var rowV = $(ui.draggable).parent().parent().attr('class').split('-')[1];
        console.log("V: " + rowV + "-" + colV + " || ");
        console.log(rowAct + "-" + colAct);
        var imgAct = $(this).find('img').attr('name');
        var imgV = $(ui.draggable).attr('name');
        candyAct = { "img": imgAct, "col": colV, "row": rowV };
        candyV = { "img": imgV, "col": colAct, "row": rowAct };

        if (colAct != colV) {
          if ((colAct - colV == 1) || (colAct - colV == -1)) {
            if (rowAct == rowV) {
              var parentDrag = $(ui.draggable).parent();
              parentDrag.html("");
              $(this).html("");
              parentDrag.html(createImg(imgAct));
              $(this).html(createImg(imgV));
              setDraggable($(this).find("img"));
              setDraggable(parentDrag.find("img"));
              $(this).find("img").show();
              parentDrag.find("img").show();
              goodMov = true;
              movements++;
            }
          }
        } else if (rowAct != rowV) {
          if ((rowAct - rowV == 1) || (rowAct - rowV == -1)) {
            if (colAct == colV) {
              var parentDrag = $(ui.draggable).parent();
              parentDrag.html("");
              $(this).html("");
              parentDrag.html(createImg(imgAct));
              $(this).html(createImg(imgV));
              setDraggable($(this).find("img"));
              setDraggable(parentDrag.find("img"));
              $(this).find("img").show();
              parentDrag.find("img").show();
              goodMov = true;
              movements++;
            }
          }
        }
      }
    });
  }

  function setDraggable(obj) {
    obj.draggable({
      snap: true,
      snapTolerance: 80,
      snapMode: "inner",
      stack: ".candy",
      revert: true
    });
  }

  function setCandys() {
    for (var row = 1; row < 8; row++) {
      for (var col = 1; col < 8; col++) {
        var img = Math.floor((Math.random() * 4) + 1);
        $('.row-' + row).find('.col-' + col).html(createImg(img));
      }
    }
    setDraggable($('.panel-tablero img'));
    setTimeout(function () { $('.panel-tablero img').show('slide', { direction: "up" }, 800); }, 200);
  }

  function setCandy(row, col, action) {
    var columnSel = $('.row-' + row).find('.col-' + col);
    if (action == 'c') {
      var img = Math.floor((Math.random() * 4) + 1);
      columnSel.html(createImg(img));
    } else if (action == 'm') {
      var rowAnt = parseInt(row) - 1;
      $('.row-' + rowAnt).find('.col-' + col).find('img').appendTo(columnSel).hide().show('slide', { direction: "up" }, 900);
    }
    setTimeout(function () { columnSel.find('img').show('slide', { direction: "up" }, 500); }, 200);
    setDraggable(columnSel.find('img'));
  }

  function createImg(img) {
    return '<img name=' + img + ' class="candy" src="image/' + img + '.png"></img>';
  }

  function checkRows() {
    for (var row = 1; row < 8; row++) {
      for (var col = 1; col < 8; col++) {
        var candy = getCandy(row, col);
        if (col < 7) {
          for (var x = 1; x < 8; x++) {
            if (candy == getCandy(row, col + x) && candy == getCandy(row, col + x + 1)) {
              if (candy == getCandy(row, col + x + 2)) {
                if (candy == getCandy(row, col + x + 3)) {
                  plusPoints(row, col, 'row', col + 5);
                  col += 5;
                  break;
                } else {
                  plusPoints(row, col, 'row', col + 4);
                  col += 4;
                  break;
                }
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
                if (candy == getCandy(row + x + 3, col)) {
                  plusPoints(row, col, 'col', row + 5);
                  row += 5;
                  break;
                } else {
                  plusPoints(row, col, 'col', row + 4);
                  row += 4;
                  break;
                }
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
        $('.row-' + row).find('.col-' + i).addClass("animate");
        //candyPoints.push($('.row-' + row).find('.col-' + i));
        if (num == 5) {
          points = points + 6;
        } else if (num == 4) {
          points = points + 3;
        } else {
          points++;
        }
      }
    } else {
      for (var i = row; i < num; i++) {
        // candyPoints.push($('.row-' + i).find('.col-' + col));
        $('.row-' + i).find('.col-' + col).addClass("animate");
        if (num == 5) {
          points = points + 6;
        } else if (num == 4) {
          points = points + 3;
        } else {
          points++;
        }
      }
    }
    goodMov = false;
  }

  function finishChecking() {
    var candyAni = $(".animate");
    candyAni.effect("pulsate", 1300);
    setTimeout(function () {
      candyAni.html('');
      candyAni.removeClass("animate");
      setTimeout(function () {
        moveCandy();
        initGame();
      });
    }, 1500);
    $('#score-text').html(points);
    $('#movimientos-text').html(movements);
    candyPoints = [];

    if (goodMov) {
      //devolver2candys;
      $('.row-' + candyAct.row).find('.col-' + candyAct.col).html("");
      $('.row-' + candyV.row).find('.col-' + candyV.col).html("");
      $('.row-' + candyAct.row).find('.col-' + candyAct.col).html(createImg(candyV.img));
      $('.row-' + candyV.row).find('.col-' + candyV.col).html(createImg(candyAct.img));
      setDraggable($('.row-' + candyAct.row).find('.col-' + candyAct.col).find('img'));
      setDraggable($('.row-' + candyV.row).find('.col-' + candyV.col).find('img'));
      $('.row-' + candyAct.row).find('.col-' + candyAct.col).find('img').show();
      $('.row-' + candyV.row).find('.col-' + candyV.col).find('img').show();
      candyAct = {};
      candyV = {};
      goodMov = false;
      movements--;
    }

    // $.each(candyPoints, function (idx, val) {
    //   val.effect("pulsate", 1500);
    //   setTimeout(function () {
    //     val.html('');
    //     moveCandy();
    //   }, 1500);
    //   $('#score-text').html(points);
    // });
    // candyPoints = [];
    // intervalManager(true, initGame, 2500);
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
  }

  function endGame() {
    console.log("fin de juego");
    $('.time').hide();
    setTimeout(function () {
      $('.panel-tablero').show().hide();
      $('.panel-score').prepend('<h1 style="text-align: center;" class="main-titulo">Juego Terminado</h1>');
    }, 1600);
    $('.panel-tablero').css({ "width": '0%', 'height': '0' });
    $('.panel-score').css('width', '100%');
    m = 9999;
  }

  function getCandy(row, col) {
    return $('.row-' + row).find('.col-' + col).find('img').attr('name');
  }

  return {
    init: init,
    endGame: endGame
  }

})();

// });
