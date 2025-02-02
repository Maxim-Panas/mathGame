function getHighScore() {
    return localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;
}

function updateHighScore(score) {
    let highScore = getHighScore();
    if (score > highScore) {
        localStorage.setItem("highScore", score);
        document.getElementById("highScore").innerText = score;
    }
}


var gameObj = {
  points: {
      score: 0,
      history: [],
      status: 1
  },
  stage: [],
  intiStage: function () {
      for (var cell = 0; cell < 4; cell++) {
          this.stage[cell] = [];
          for (var row = 0; row < 4; row++) {
              this.stage[cell][row] = {
                  boxObj: null,
                  position: [cell, row]
              };
          }
      }

  },
  
      empty: function () {
      var emptyList = [];
      for (var row = 0; row < 4; row++) {
          for (var cell = 0; cell < 4; cell++) {
              if (this.stage[cell][row].boxObj == null) {
                  emptyList.push(this.stage[cell][row]);
              }
          }
      }
      return emptyList;
  },
  newBox: function () {
      var _this = this;
      
      
      var box = function (obj) {
          var num = Math.random() > 0.9 ? 4 : 2;
          this.value = num;
          this.parent = obj;
          this.domObj = function () {
              var domBox = document.createElement('span');
              domBox.innerText = num;
              domBox.textContent = num;
              domBox.className = 'row' + obj.position[0] + ' ' + 'cell' + obj.position[1] + ' ' + 'num' + num;
              var root = document.getElementById('stage');
              root.appendChild(domBox);
              return  domBox;
          }();
          obj.boxObj = this;
      }
      var emptyList = this.empty();
      if (emptyList.length) {
          var randomIndex = Math.floor(Math.random() * emptyList.length);
          new box(emptyList[randomIndex]);
          return true;
      }
  },
  isEnd:function(){
      var emptyList = this.empty();
      if (!emptyList.length) {
          for(var i=0;i<4;i++){
              for(var j=0;j<4;j++){
                  var obj=this.stage[i][j];
                  var objLeft=(j==0)?{boxObj:{value:0}}:this.stage[i][j-1];
                  var objRight=(j==3)?{boxObj:{value:0}}:this.stage[i][j+1];
                  var objUp=(i==0)?{boxObj:{value:0}}:this.stage[i-1][j];
                  var objDown=(i==3)?{boxObj:{value:0}}:this.stage[i+1][j];
                  if(obj.boxObj.value==objLeft.boxObj.value
                      ||obj.boxObj.value==objDown.boxObj.value
                      ||obj.boxObj.value==objRight.boxObj.value
                      ||obj.boxObj.value==objUp.boxObj.value){
                      return false
                  }
              }
          }
          return true;
      }
      return false;
  },
  gameOver: function() {
    // Створюємо елемент повідомлення
    var message = document.createElement('div');
    message.textContent = 'Game Over!';

    // Стилі для повідомлення
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.backgroundColor = '#003366'; // темносиний
    message.style.color = '#fff'; // білий текст
    message.style.padding = '20px';
    message.style.borderRadius = '10px';
    message.style.fontSize = '24px';
    message.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
    message.style.zIndex = '1000';

    // Створюємо кнопку "Нова гра"
    var newGameButton = document.createElement('button');
    newGameButton.textContent = 'Нова гра';
    newGameButton.style.marginTop = '20px';
    newGameButton.style.padding = '10px 20px';
    newGameButton.style.fontSize = '16px';
    newGameButton.style.backgroundColor = '#0055a5'; // темно-синій колір кнопки
    newGameButton.style.color = '#fff'; // білий текст
    newGameButton.style.border = 'none';
    newGameButton.style.borderRadius = '5px';
    newGameButton.style.cursor = 'pointer';

    // Додаємо функціонал для кнопки "Нова гра"
    newGameButton.onclick = function() {
        location.reload(); // перезавантажує сторінку для початку нової гри
    };

    // Додаємо кнопку до повідомлення
    message.appendChild(newGameButton);

    // Додаємо повідомлення на сторінку
    document.body.appendChild(message);

}
,
  moveTo :function (obj1, obj2) {
          obj2.boxObj = obj1.boxObj;
          obj2.boxObj.domObj.className = 'row' + obj2.position[0] + ' ' + 'cell' + obj2.position[1] + ' ' + 'num' + obj2.boxObj.value;
          obj1.boxObj = null;
      },
  addTo : function (obj1, obj2) {
          obj2.boxObj.domObj.parentNode.removeChild(obj2.boxObj.domObj);
          obj2.boxObj = obj1.boxObj;
          obj1.boxObj = null;
          obj2.boxObj.value = obj2.boxObj.value * 2;
          obj2.boxObj.domObj.className = 'row' + obj2.position[0] + ' ' + 'cell' + obj2.position[1] + ' ' + 'num' + obj2.boxObj.value;
          obj2.boxObj.domObj.innerText = obj2.boxObj.value;
          obj2.boxObj.domObj.textContent = obj2.boxObj.value;
          this.points.score += obj2.boxObj.value;
          var scoreBar = document.getElementById('score');
          scoreBar.innerText = this.points.score;
          
          // Оновлюємо high score
          updateHighScore(this.points.score);
          
      scoreBar.textContent=this.points.score;
      return obj2.boxObj.value;


  },
  clear:function(x,y){
      var can=0;
    for(var i=0;i<4;i++){
        var fst=null;
        var fstEmpty=null;
        for(var j=0;j<4;j++){
            var objInThisWay=null;
            switch (""+x+y){
                case '00': objInThisWay=this.stage[i][j];break;
                case '10':objInThisWay=this.stage[j][i];break;
                case '11':objInThisWay=this.stage[3-j][i];break;
                case '01':objInThisWay=this.stage[i][3-j];break;
            }
            if(objInThisWay.boxObj!=null){
               if(fstEmpty){
                 this.moveTo(objInThisWay,fstEmpty)
                  fstEmpty=null;
                  j=0;
                   can=1;
               }
            }else if(!fstEmpty){
                 fstEmpty=objInThisWay;
            }
        }
    }
      return can;
  },
  
  move: function (x,y) {
      var can=0;
      can=this.clear(x,y)?1:0;
      var add=0;
      for(var i=0;i<4;i++){
          for(var j=0;j<3;j++){
              var objInThisWay=null;
              var objInThisWay2=null;
              switch (""+x+y){
                  case '00':{
                      objInThisWay=this.stage[i][j];
                      objInThisWay2=this.stage[i][j+1];break;
                  }
                  case '10':{
                      objInThisWay=this.stage[j][i];
                      objInThisWay2=this.stage[j+1][i];break;
                  }

                  case '11':{
                      objInThisWay=this.stage[3-j][i];
                      objInThisWay2=this.stage[2-j][i];break;
                  }
                  case '01':{
                      objInThisWay=this.stage[i][3-j];
                      objInThisWay2=this.stage[i][2-j];break;
                  }
              }
              if(objInThisWay2.boxObj&&objInThisWay.boxObj.value==objInThisWay2.boxObj.value){
                add+=this.addTo(objInThisWay2,objInThisWay);
                  this.clear(x,y);
                  can=1;
              }
          }
      }
      if(add){
          var addscore=document.getElementById('addScore');
          addscore.innerText="+"+add;
          addscore.textContent="+"+add;
          addscore.className="show";
          setTimeout(function(){
              addscore.className="hide";
          },500);
      }
      if(can){
          this.newBox();
      }
      if(this.isEnd()){
          this.gameOver();
      }
  },

  inti: null
}
var controller = function () {
  var startX = 0;
  var startY = 0;
  var ready = 0;
  this.start = function (x, y) {
      ready = 1;
      startX = x;
      startY = y;
  };
  this.move = function (x, y) {
      if (x - startX > 100 && ready) {
          gameObj.move(0, 1);
          ready = 0;
      } else if (startX - x > 100 && ready) {
          gameObj.move(0, 0);
          ready = 0;
      }
      else if (startY - y > 100 && ready) {
          gameObj.move(1, 0);
          ready = 0;
      }
      else if (y - startY > 100 && ready) {
          gameObj.move(1, 1);
          ready = 0;
      }
  }
  this.end = function (x, y) {
      ready = 0;
  }
  return {
      start: this.start,
      move: this.move,
      end: this.end
  }
}();
function disableSelection(target){
  if (typeof target.onselectstart!="undefined") 
      target.onselectstart=function(){return false}
  else if (typeof target.style.MozUserSelect!="undefined") 
      target.style.MozUserSelect="none"
  else 
      target.onmousedown=function(){return false}
  target.style.cursor = "default"
}
window.onload = function () {
  gameObj.intiStage();
  gameObj.newBox();
  document.getElementById("highScore").innerText = getHighScore();

  var stage = document.getElementById('stage');
  document.onmousedown = function (e) {
      var event = e || window.event;
      var obj = event.target || event.srcElement;
      var x = event.clientX;
      var y = event.clientY;
      controller.start(x, y);
  }
  document.onmousemove = function (e) {
      var event = e || window.event;
      var obj = event.target || event.srcElement;
      var x = event.clientX;
      var y = event.clientY;
      controller.move(x, y);
  }
  document.onmouseup = function (e) {
      var event = e || window.event;
      var obj = event.target || event.srcElement;
      var x = event.clientX;
      var y = event.clientY;
      controller.end(x, y);
  }
  function keyUp(e) {
      var currKey=0,e=e||event;
      currKey=e.keyCode||e.which||e.charCode;
      var keyName = String.fromCharCode(currKey);
      switch (currKey){
          case 37:gameObj.move(0, 0);break;
          case 38:gameObj.move(1, 0);break;
          case 39:gameObj.move(0, 1);break;
          case 40:gameObj.move(1, 1);break;
      }
  }
  document.onkeyup = keyUp;
}


document.addEventListener("DOMContentLoaded", function () {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  
  document.addEventListener("touchstart", function (event) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
  });

  document.addEventListener("touchend", function (event) {
      touchEndX = event.changedTouches[0].clientX;
      touchEndY = event.changedTouches[0].clientY;
      handleGesture();
  });

  function handleGesture() {
      let deltaX = touchEndX - touchStartX;
      let deltaY = touchEndY - touchStartY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 50) {
              gameObj.move(0, 1); // Право
          } else if (deltaX < -50) {
              gameObj.move(0, 0); // Ліво
          }
      } else {
          if (deltaY > 50) {
              gameObj.move(1, 1); // Вниз
          } else if (deltaY < -50) {
              gameObj.move(1, 0); // Вгору
          }
      }
  }
});
document.getElementById("newGame").addEventListener("click", function () {
    location.reload(); // Оновлення сторінки
  });
  document.getElementById("instructions").addEventListener("click", function() {
    window.location.href = "main1.html";  // Перенаправляє на файл main1.html
});

document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('background-music');
    var button = document.getElementById('mute-button');

    if (!audio || !button) return; // Перевірка, чи існують елементи

    // Завантажуємо стан mute з localStorage
    var isMuted = localStorage.getItem('isMuted') === 'true';
    audio.muted = isMuted;

    // Встановлюємо правильний смайлик на кнопці відповідно до стану звуку
    button.textContent = audio.muted ? '🔇' : '🔊';

    // Додаємо плавне збільшення гучності
    function fadeInMusic() {
        let volume = 0;
        audio.volume = volume;
        audio.play().then(() => {
            let interval = setInterval(() => {
                volume += 0.05;
                if (volume >= 1) {
                    clearInterval(interval); // Зупиняємо інтервал, коли досягнута максимальна гучність
                }
                audio.volume = volume;
            }, 100); // Кожні 100 мс збільшуємо гучність на 0.05
        }).catch(() => console.log("Щось пішло не так з відтворенням."));
    }

    // Функція для запуску музики після взаємодії з користувачем
    function playOnUserInteraction() {
        fadeInMusic();
        removeInteractionListeners(); // Видаляємо обробники після першого спрацьовування
    }

    // Видалення обробників після першого взаємодії
    function removeInteractionListeners() {
        document.removeEventListener('click', playOnUserInteraction);
        document.removeEventListener('keydown', playOnUserInteraction);
        document.removeEventListener('scroll', playOnUserInteraction);
        document.removeEventListener('touchstart', playOnUserInteraction);
        document.removeEventListener('mousemove', playOnUserInteraction);
    }

    // Якщо музика не грає, намагаємось запустити з fade-in ефектом
    if (audio.paused && !audio.muted) {
        fadeInMusic();
    }

    // Додаємо обробник події на кнопку для перемикання гучності
    button.addEventListener('click', function () {
        audio.muted = !audio.muted;
        localStorage.setItem('isMuted', audio.muted);
        button.textContent = audio.muted ? '🔇' : '🔊'; // Зміна смайлика на кнопці
    });

    // Спроба запустити музику одразу
    var playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.log("Автовідтворення заблоковано. Чекаємо на взаємодію...");
            // Якщо браузер блокує — чекаємо на будь-яку взаємодію
            document.addEventListener('click', playOnUserInteraction, { once: true });
            document.addEventListener('keydown', playOnUserInteraction, { once: true });
            document.addEventListener('scroll', playOnUserInteraction, { once: true });
            document.addEventListener('touchstart', playOnUserInteraction, { once: true });
            document.addEventListener('mousemove', playOnUserInteraction, { once: true });
        });
    }
});
