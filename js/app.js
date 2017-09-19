function endGame(){
  console.log("fin de juego");
}

function setDroppable(){
  $( "div[class^='col']" ).droppable({
    accept:'.candy',
      drop: function( event, ui ) {
        $( this ).html( $( this ).attr('class') );
        console.log(this);
        $(ui.draggable).removeClass('candy');
      }
    });
}

function setCandys(){
  for(var row = 1;row < 8;row++){
    for(var col = 1;col < 8;col++){
      var img = Math.floor((Math.random() * 4) + 1);
      $('.row-'+row).find('.col-'+col).html('<img name='+img+' class="candy" src="image/'+img+'.png"></img>');
    }
  }
  $('.panel-tablero img').draggable();
  setTimeout(function(){$('.panel-tablero img').show('slide',{ direction: "up"  },900);},400);
}

function checkRows(){
  for(var row = 1;row < 8;row++){
    for(var col = 1;col < 8;col++){
      var candy = getCandy(row,col);
      if(col<7){
        for(var x = 1;x < 8;x++){
          if (candy == getCandy(row,col+x) && candy==getCandy(row,col+x+1)){
            if (candy == getCandy(row,col+x+2)){
              makePoints(row,col,'row',col+4);
              col+=4;
              break;
            }else{
              makePoints(row,col,'row',col+3);
              col+=3;
              break;
            }
          }
          break;
        }
      }
      console.log(candy);
    }
  }
}

function makePoints(row,col,dir,num){
  if(dir=='row'){
    for (var i = col; i < num; i++) {
      $('.row-'+row).find('.col-'+i).html('');
      //sumar puntos
    }
  }
}

function getCandy(row,col){
  return $('.row-'+row).find('.col-'+col).find('img').attr('name');
}

var Game=(function(){

})();
