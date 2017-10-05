var globalC = 22;
var suelto=null;

  function endGame() {
    clearInterval(startTimer);
    console.log("fin de juego");
  }

// $(document).ready(function () {
  var globalD = 33;
  $('.btn-reinicio').click(function (e) {
    if ($(this).html() == 'Iniciar') {
      $(this).html('Reiniciar');
      init();
    } else {
      location.reload();
    }
  });

  var candyPoints = [];
  var playing = true;
  var play;
  var intervalID = null;
  var points = 0;

  var init = function () {
    $('#timer').html('2:00');
    setInterval(startTimer, 1000);
    setCandys();
    setDroppable();
    initGame();
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
    }, 1000);
  }


  function setDroppable() {
    $("div[class^='col']").droppable({
      accept: function(e){
        var colV=0;
        var rowV=0;
        var colAct=0;
        var rowAct=0;
        if(e.hasClass("candy")){
          colAct=$(this).attr('class').split(' ')[0].split('-')[1];
          rowAct=$(this).parent().attr('class').split('-')[1];

          colV=$(e).parent().attr('class').split(' ')[0].split('-')[1];
          rowV=$(e).parent().parent().attr('class').split('-')[1];

          if(colAct != colV && rowAct != rowV){
            if((colAct - colV == 1) || (colAct - colV == -1) ){
              if((rowAct - rowV == 1) || (rowAct - rowV == -1)){
                return true;
              }
            }
          }
        }
      },
      drop: function (event, ui) {

        colAct=$(this).attr('class').split(' ')[0].split('-')[1];
        rowAct=$(this).parent().attr('class').split('-')[1];

        colV=$(ui.draggable).parent().attr('class').split(' ')[0].split('-')[1];
        rowV=$(ui.draggable).parent().parent().attr('class').split('-')[1];
        console.log("V: "+rowV+"-"+colV+" || ");
        console.log(rowAct+"-"+colAct);

        //$(ui.draggable).removeClass('candy');
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
    $('.panel-tablero img').draggable({
      snap: true,
      snapTolerance: 80,
      snapMode: "inner",
      stack: ".candy",
      revert: "invalid"
    });
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
    columnSel.find('img').draggable({
      snap: true,
      snapTolerance: 80,
      snapMode: "inner",
      stack: ".candy",
      revert: "invalid"
    });
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
  }

  function finishChecking() {
    var candyAni = $(".animate");
    candyAni.effect("pulsate",1300);
    //candyPoints.effect("pulsate",1500);
    setTimeout(function () {
      candyAni.html('');
      candyAni.removeClass("animate");
      setTimeout(function(){
        moveCandy();
        //intervalManager(true, initGame, 2500);
        initGame();
      });
    }, 1500);
    $('#score-text').html(points);
    candyPoints = [];


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
    //intervalManager(false);
  }

  function getCandy(row, col) {
    return $('.row-' + row).find('.col-' + col).find('img').attr('name');
  }

  var Game = (function () {

  })();

// });
