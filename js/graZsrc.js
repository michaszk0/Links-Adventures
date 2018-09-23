$(function() {

  var box = {
    PosX: 5,
    PosY: 0,
    object: $('.box'),
    speed: "",
    direction: "",
    lifes: 3
  };

  $('.box').css('left', box.PosX * 50);
  $('.box').css('bottom', box.PosY * 50);

  //Array of objects - rafts================

  var rafts = [
    // rafts line-1============
    {
      PosX: 10,
      PosY: 1,
      object: $('.tratwa_1-1'),
      on: false,
      speed: "",
      direction: ""
    }, {
      PosX: 8,
      PosY: 1,
      object: $('.tratwa_1-2'),
      on: false,
      speed: "",
      direction: ""
    },
    // rafts line-2============
    {
      PosX: 6,
      PosY: 2,
      object: $('.tratwa_2-1'),
      on: false,
      speed: "",
      direction: ""
    }, {
      PosX: 2,
      PosY: 2,
      object: $('.tratwa_2-2'),
      on: false,
      speed: "",
      direction: ""
    }
  ];

  // drawing a rafts in line-1 =========================
  rafts[0].object.css('left', rafts[0].PosX * 50);
  rafts[1].object.css('left', rafts[1].PosX * 50);
  // drawing a rafts in line-2 =========================
  rafts[2].object.css('left', rafts[2].PosX * 50);
  rafts[3].object.css('left', rafts[3].PosX * 50);

  checkPosition = function checkPosition(x, y, Dir, boxPos) {
    console.log("checkPosition");
    //x - box.PosX, y - box.PosY, Dir - direction, boxPos - box.PosX or box.PosY
    for (i = 0; i < rafts.length; i++) {
      if (x == rafts[i].PosX && y == rafts[i].PosY && rafts[i].on == true) {
        //condition - jump on raft and raft.on is true then block
        console.log("busy");
        // if(boxPos == box.PosY){
        //   box.PosY = box.PosY + Dir;
        // }
        // else if(boxPos == box.PosX){
        //   box.PosX = box.PosX + Dir;
        // }

      } else if (x == rafts[i].PosX && y == rafts[i].PosY && rafts[i].on == false) {
        //condition - jump on raft anf raft.on i false then log "hit"
        console.log("hit");
        $('.box').css('left', box.PosX * 50);
        $('.box').css('bottom', box.PosY * 50);
      }

      if (x !== rafts[i].PosX && y !== rafts[i].PosY && y !== 0 && y !== 5 && y !== 10) {
        console.log(rafts[i]);
        // box.PosX = 5;
        // box.PosY = 0;
        console.log("game over - water");
        // changePosition();

        //changePosition() without parameter rendering box in default position
      }
    }
  };

  // checkPosition = (x, y) => {
  //   console.log(x,y);
  //   for (i=0; i<rafts.length; i++){
  //     if(x == rafts[i].PosX && y == rafts[i].PosY && rafts[i].on == false){
  //       boxPosChange(rafts[i]);
  //     }else if(x !== rafts[i].PosX && y !== rafts[i].PosY && y !== 0 && y !==5 && y !==10){
  //       console.log("game over");
  //     }
  //   }
  // }


  $("body").keydown(function(e) {
    switch (e.which) {
      case 39:
        changePosition('right');
        break;
      case 37:
        changePosition('left');
        break;
      case 38:
        changePosition('up');
        break;
      case 40:
        changePosition('down');
        break;
      default:
        console.log("use arrows");
    }
  });

  changePosition = function changePosition(direction) {
    if (direction == 'right') {
      if (box.PosX < 10) {
        box.PosX = box.PosX + 1;
        $('.box').css('left', box.PosX * 50);
        checkPosition(box.PosX, box.PosY, -1, box.PosX);
        console.log(box.PosX, box.PosY);
      }
    } else if (direction == 'left') {
      if (box.PosX > 0) {
        box.PosX = box.PosX - 1;
        $('.box').css('left', box.PosX * 50);
        checkPosition(box.PosX, box.PosY, +1, box.PosX);
        console.log(box.PosX, box.PosY);
      }
    } else if (direction == "up") {
      if (box.PosY < 10) {
        console.log('stary pos', box.PosY);
        box.PosY = box.PosY + 1;
        console.log('nowy pos', box.PosY);
        $('.box').css('bottom', box.PosY * 50);
        checkPosition(box.PosX, box.PosY, -1, box.PosY);
        console.log(box.PosX, box.PosY);
      }
    } else if (direction == "down") {
      if (box.PosY > 0) {
        box.PosY = box.PosY - 1;
        $('.box').css('bottom', box.PosY * 50);
        checkPosition(box.PosX, box.PosY, +1, box.PosY);
        console.log(box.PosX, box.PosY);
      }
    } else {
      $('.box').css('bottom', box.PosY * 50);
      $('.box').css('left', box.PosX * 50);
    }
  };

  Move = function Move(direction, speed, element) {
    element.speed = speed;
    element.direction = direction;

    if (direction == "left") {
      var MoveTo = setInterval(function() {
        if (box.PosX == element.PosX && box.PosY == element.PosY) {
          console.log("ok");
          box.PosX = element.PosX;
          box.PosY = element.PosY;
          $('.box').css('left', box.PosX * 50);
          $('.box').css('bottom', box.PosY * 50);
        } else {
          // console.log(element.PosX, element.PosY);
          // console.log(box.PosX, box.PosY);
          // console.log(element);
        }

        if (element.PosX == 0) {
          if (element.on == true) {
            box.PosX = 5;
            box.PosY = 0;
            console.log("game over left");
            changePosition();
          }
          element.PosX = 11;
        }

        element.PosX = element.PosX - 1;
        element.object.css('left', element.PosX * 50);
      }, speed);
    } else if (direction == "right") {
      var _MoveTo = setInterval(function() {
        if (element.PosX == 10) {
          if (element.on == true) {
            box.PosX = 5;
            box.PosY = 0;
            console.log("game over move right");
            changePosition();
          }

          // if (element.on == true){
          //   console.log("game over");
          // }
          element.PosX = -1;
        }
        element.PosX = element.PosX + 1;
        element.object.css('left', element.PosX * 50);
      }, speed);
    }
  };

  // Wywołanie ruchu w line-1
  Move("left", 1000, rafts[0]);
  Move("left", 1000, rafts[1]);
  // Wywołanie ruchu w line-2
  Move("right", 800, rafts[2]);
  Move("right", 800, rafts[3]);
});
