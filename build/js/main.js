"use strict";

var startGameBtn = document.querySelector('.main__game-machine-btn');
var startText = document.querySelector(".start-text");
var hookWrap = document.querySelector('.hook-wrap'); // батьківський елемент в якому знаходиться хук
var hookFastening = document.querySelector('.hook-fastering'); // елемент кріплення хука до gamebody

var gameBody = document.querySelector(".game-body"); // елемент до якого кріпиться хук і лінія на якій він спускається до монеток
var result = document.querySelector(".result"); // таблиця результатів гри
var coins = document.querySelector(".coins"); // батьківський елемент монеток
var gameOver = document.querySelector(".gameOver"); // екран який відображається по закінченню гри

var popupBtn = document.querySelector(".gameOver__info");
var popupWindow = document.querySelector(".popup");
var popupClose = document.querySelector(".popup__close");
var FS = document.querySelector(".FS");
var elemsInsideFS = FS.querySelectorAll("span"); //span елементи в які записується результат FS
var RFB = document.querySelector(".RFB");
var elemsInsideRFB = RFB.querySelectorAll("span"); //span елементи в які записується результат RFB
var EUR = document.querySelector(".EUR");
var elemsInsideEUR = EUR.querySelectorAll("span"); //span елементи в які записується результат EUR
var coin3 = document.querySelector(".coin3"); // монетка яка буде спіймана першою
var coin4 = document.querySelector(".coin4"); // монетка яка буде спіймана другою
var frameCounter = 0; // потрібен для відстежування ключових точок анімації
var animationHandler = false;
// let popupHandler = 0 // відстежує відкритий попап чи ні
startGameBtn.addEventListener("click", function () {
  if (!animationHandler) {
    animationHandler = true;
    startText.style.display = "none";
    hookWrap.classList.add("hook-move-horizontal"); // запуск гри
  }

  if (animationHandler) {
    startGameBtn.classList.add("btn-off");
  }
});
coin3.addEventListener("animationend", function () {
  // відстежуємо момент закінчкення анімації першого монетки для запуску циклу анімацій другої монетки
  frameCounter++; //збільшує frameCounter кожного разу коли відбувається анімація першої монетки
  // console.log(`coin ${frameCounter}`)

  //прибираємо стилі анімації першого хука
  hookWrap.classList.remove("hook-catch1-up");
  hookFastening.classList.remove("hook-fastering-catch1-up");
  hookWrap.classList.remove("hook-catch1-down");
  hookFastening.classList.remove("hook-fastering-catch1-down");

  // прибираємо класи відпрацьованої анімації руху та додаємо анімацію зникнення монетки
  coin3.classList.remove("coin-catch");
  coin3.classList.add("coin-disappearance");
  coin3.style.opacity = "0";

  // анімація оновлення FS на таблиці запускається після завершення анімації зникнення першої монетки
  if (frameCounter === 7) {
    elemsInsideFS.forEach(function (item, i) {
      if (i === 0) {
        item.style.opacity = "0";
        item.textContent = '1';
        setTimeout(function () {
          item.style.opacity = "1";
        }, 500);
      }
      if (i === 1) {
        setTimeout(function () {
          item.style.opacity = "0";
          item.textContent = '5';
          setTimeout(function () {
            item.style.opacity = "1";
            hookWrap.classList.add("hook-move-horizontal2"); // ініціюємо анімацію руху до другої монетки
          }, 500);
        }, 200);
      }
    });
  }
});
coin4.addEventListener("animationend", function () {
  frameCounter++; //збільшує frameCounter кожного разу коли відбувається анімація другої монетки
  // console.log(`coin ${frameCounter}`)

  //прибираємо стилі анімації другого хука
  hookWrap.classList.remove("hook-catch2-up");
  hookFastening.classList.remove("hook-fastering-catch2-up");
  hookWrap.classList.remove("hook-catch2-down");
  hookFastening.classList.remove("hook-fastering-catch2-down");

  // прибираємо класи відпрацьованої анімації руху та додаємо анімацію зникнення другої монетки
  coin4.classList.remove("coin-catch");
  coin4.classList.add("coin-disappearance");
  coin4.style.opacity = "0";

  // анімація оновлення RFB та EUR на таблиці запускається після завершення анімації зникнення другої монетки
  if (frameCounter === 14) {
    elemsInsideRFB.forEach(function (item, i) {
      if (i === 0) {
        item.style.opacity = "0";
        item.textContent = '1';
        setTimeout(function () {
          item.style.opacity = "1";
        }, 500);
      }
      if (i === 1) {
        setTimeout(function () {
          item.style.opacity = "0";
          item.textContent = '0';
          setTimeout(function () {
            item.style.opacity = "1";
          }, 500);
        }, 200);
      }
    });
    elemsInsideEUR.forEach(function (item, i) {
      if (i === 0) {
        item.style.opacity = "0";
        item.textContent = '1';
        setTimeout(function () {
          item.style.opacity = "1";
        }, 500);
      }
      if (i === 1) {
        setTimeout(function () {
          item.style.opacity = "0";
          item.textContent = '0';
          setTimeout(function () {
            item.style.opacity = "1";
            // приховуємо елементи гри і відображаємо екран закінчення
            setTimeout(function () {
              gameBody.style.opacity = "0";
              result.style.opacity = "0";
              coins.style.opacity = "0";
              gameOver.style.opacity = "1";
              gameOver.style.zIndex = "10";
              //логіка кнопки відкриття попапу, додається після відображення екрану закінчення гри
              popupBtn.addEventListener("click", function () {
                document.querySelector("body").style.overflowY = "hidden";
                popupWindow.style.opacity = "1";
                popupWindow.style.zIndex = "100";
                // popupHandler++
              });
              //логіка кнопки закриття попапу, додається після відображення екрану закінчення гри
              popupClose.addEventListener("click", function () {
                console.log("close");
                document.querySelector("body").style.overflowY = "visible";
                popupWindow.style.opacity = "0";
                popupWindow.style.zIndex = '-100';
                // popupHandler--
              });
              // document.addEventListener("click", (e) =>{
              //     if(e.target !== popupWindow && popupHandler === 1){
              //         console.log("close")
              //         document.querySelector("body").style.overflowY = "visible"
              //         popupWindow.style.opacity = "0"
              //         popupWindow.style.zIndex = '-100'
              //     }
              // })
            }, 500);
          }, 500);
        }, 200);
      }
    });
  }
});
hookWrap.addEventListener("animationend", function () {
  frameCounter++; // збільшує frameCounter кожного разу коли відбувається анімація хука
  // console.log(frameCounter)
  if (frameCounter === 1) {
    //фіксація хука перед першою монетою
    hookWrap.classList.add("hook-position-catch1");
  }
  if (frameCounter === 3) {
    // логіка руху першої монетки після того як її хукнули
    coin3.classList.add("coin-catch");
    hookWrap.classList.add("hook-catch1-up");
    hookFastening.classList.add("hook-fastering-catch1-up");
  }
  if (frameCounter < 7) {
    // логіка анімації руху хука до першої монетки
    hookWrap.classList.remove("hook-move-horizontal");
    hookWrap.classList.add("hook-catch1-down");
    hookFastening.classList.add("hook-fastering-catch1-down");
  }
  if (frameCounter === 8) {
    // логіка анімації руху хука до другої монетки
    hookWrap.classList.remove("hook-move-horizontal2");
    hookWrap.classList.add("hook-position-catch2");
    hookWrap.classList.add("hook-catch2-down");
    hookFastening.classList.add("hook-fastering-catch2-down");
  }
  if (frameCounter === 10) {
    // логіка руху другої монетки після того як її хукнули
    hookWrap.classList.add("hook-catch2-up");
    hookFastening.classList.add("hook-fastering-catch2-up");
    coin4.classList.add("coin-catch");
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic3RhcnRHYW1lQnRuIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic3RhcnRUZXh0IiwiaG9va1dyYXAiLCJob29rRmFzdGVuaW5nIiwiZ2FtZUJvZHkiLCJyZXN1bHQiLCJjb2lucyIsImdhbWVPdmVyIiwicG9wdXBCdG4iLCJwb3B1cFdpbmRvdyIsInBvcHVwQ2xvc2UiLCJGUyIsImVsZW1zSW5zaWRlRlMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiUkZCIiwiZWxlbXNJbnNpZGVSRkIiLCJFVVIiLCJlbGVtc0luc2lkZUVVUiIsImNvaW4zIiwiY29pbjQiLCJmcmFtZUNvdW50ZXIiLCJhbmltYXRpb25IYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0eWxlIiwiZGlzcGxheSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIm9wYWNpdHkiLCJmb3JFYWNoIiwiaXRlbSIsImkiLCJ0ZXh0Q29udGVudCIsInNldFRpbWVvdXQiLCJ6SW5kZXgiLCJvdmVyZmxvd1kiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMseUJBQXlCLENBQUM7QUFDdEUsSUFBTUMsU0FBUyxHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7QUFFdkQsSUFBTUUsUUFBUSxHQUFHSCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELElBQU1HLGFBQWEsR0FBR0osUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOztBQUVqRSxJQUFNSSxRQUFRLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDdkQsSUFBTUssTUFBTSxHQUFHTixRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ2xELElBQU1NLEtBQUssR0FB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QSxJQUFHTixZQUFZLEtBQUssRUFBRSxFQUFDO0lBQUU7SUFDckJsQixRQUFRLENBQUN1QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztJQUN4Q3ZCLGFBQWEsQ0FBQ3NCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLDBCQUEwQixDQUFDO0lBQ3ZEUCxLQUFLLENBQUNNLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztFQUNyQztBQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3RhcnRHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX2dhbWUtbWFjaGluZS1idG4nKTtcbmNvbnN0IHN0YXJ0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtdGV4dFwiKTtcblxuY29uc3QgaG9va1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9vay13cmFwJyk7IC8vINCx0LDRgtGM0LrRltCy0YHRjNC60LjQuSDQtdC70LXQvNC10L3RgiDQsiDRj9C60L7QvNGDINC30L3QsNGF0L7QtNC40YLRjNGB0Y8g0YXRg9C6XG5jb25zdCBob29rRmFzdGVuaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvb2stZmFzdGVyaW5nJyk7IC8vINC10LvQtdC80LXQvdGCINC60YDRltC/0LvQtdC90L3RjyDRhdGD0LrQsCDQtNC+IGdhbWVib2R5XG5cbmNvbnN0IGdhbWVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWJvZHlcIik7IC8vINC10LvQtdC80LXQvdGCINC00L4g0Y/QutC+0LPQviDQutGA0ZbQv9C40YLRjNGB0Y8g0YXRg9C6INGWINC70ZbQvdGW0Y8g0L3QsCDRj9C60ZbQuSDQstGW0L0g0YHQv9GD0YHQutCw0ZTRgtGM0YHRjyDQtNC+INC80L7QvdC10YLQvtC6XG5jb25zdCByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdFwiKTsgLy8g0YLQsNCx0LvQuNGG0Y8g0YDQtdC30YPQu9GM0YLQsNGC0ZbQsiDQs9GA0LhcbmNvbnN0IGNvaW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb2luc1wiKSAvLyDQsdCw0YLRjNC60ZbQstGB0YzQutC40Lkg0LXQu9C10LzQtdC90YIg0LzQvtC90LXRgtC+0LpcbmNvbnN0IGdhbWVPdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lT3ZlclwiKTsgLy8g0LXQutGA0LDQvSDRj9C60LjQuSDQstGW0LTQvtCx0YDQsNC20LDRlNGC0YzRgdGPINC/0L4g0LfQsNC60ZbQvdGH0LXQvdC90Y4g0LPRgNC4XG5cbmNvbnN0IHBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lT3Zlcl9faW5mb1wiKTtcbmNvbnN0IHBvcHVwV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cFwiKVxuY29uc3QgcG9wdXBDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlXCIpO1xuXG5jb25zdCBGUyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuRlNcIilcbmNvbnN0IGVsZW1zSW5zaWRlRlMgPSBGUy5xdWVyeVNlbGVjdG9yQWxsKFwic3BhblwiKSAvL3NwYW4g0LXQu9C10LzQtdC90YLQuCDQsiDRj9C60ZYg0LfQsNC/0LjRgdGD0ZTRgtGM0YHRjyDRgNC10LfRg9C70YzRgtCw0YIgRlNcbmNvbnN0IFJGQiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuUkZCXCIpXG5jb25zdCBlbGVtc0luc2lkZVJGQiA9IFJGQi5xdWVyeVNlbGVjdG9yQWxsKFwic3BhblwiKSAgLy9zcGFuINC10LvQtdC80LXQvdGC0Lgg0LIg0Y/QutGWINC30LDQv9C40YHRg9GU0YLRjNGB0Y8g0YDQtdC30YPQu9GM0YLQsNGCIFJGQlxuY29uc3QgRVVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5FVVJcIilcbmNvbnN0IGVsZW1zSW5zaWRlRVVSID0gRVVSLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzcGFuXCIpICAvL3NwYW4g0LXQu9C10LzQtdC90YLQuCDQsiDRj9C60ZYg0LfQsNC/0LjRgdGD0ZTRgtGM0YHRjyDRgNC10LfRg9C70YzRgtCw0YIgRVVSXG5jb25zdCBjb2luMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29pbjNcIikgLy8g0LzQvtC90LXRgtC60LAg0Y/QutCwINCx0YPQtNC1INGB0L/RltC50LzQsNC90LAg0L/QtdGA0YjQvtGOXG5jb25zdCBjb2luNCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29pbjRcIikgLy8g0LzQvtC90LXRgtC60LAg0Y/QutCwINCx0YPQtNC1INGB0L/RltC50LzQsNC90LAg0LTRgNGD0LPQvtGOXG5sZXQgZnJhbWVDb3VudGVyID0gMCAvLyDQv9C+0YLRgNGW0LHQtdC9INC00LvRjyDQstGW0LTRgdGC0LXQttGD0LLQsNC90L3RjyDQutC70Y7Rh9C+0LLQuNGFINGC0L7Rh9C+0Log0LDQvdGW0LzQsNGG0ZbRl1xubGV0IGFuaW1hdGlvbkhhbmRsZXIgPSBmYWxzZVxuLy8gbGV0IHBvcHVwSGFuZGxlciA9IDAgLy8g0LLRltC00YHRgtC10LbRg9GUINCy0ZbQtNC60YDQuNGC0LjQuSDQv9C+0L/QsNC/INGH0Lgg0L3Rllxuc3RhcnRHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKCFhbmltYXRpb25IYW5kbGVyKXtcbiAgICAgICAgYW5pbWF0aW9uSGFuZGxlciA9IHRydWVcbiAgICAgICAgc3RhcnRUZXh0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgICBob29rV3JhcC5jbGFzc0xpc3QuYWRkKFwiaG9vay1tb3ZlLWhvcml6b250YWxcIik7IC8vINC30LDQv9GD0YHQuiDQs9GA0LhcbiAgICB9XG4gICAgaWYoYW5pbWF0aW9uSGFuZGxlcil7XG4gICAgICAgIHN0YXJ0R2FtZUJ0bi5jbGFzc0xpc3QuYWRkKFwiYnRuLW9mZlwiKVxuICAgIH1cblxuXG59KTtcblxuY29pbjMuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCAoKSA9PnsgLy8g0LLRltC00YHRgtC10LbRg9GU0LzQviDQvNC+0LzQtdC90YIg0LfQsNC60ZbQvdGH0LrQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXINC/0LXRgNGI0L7Qs9C+INC80L7QvdC10YLQutC4INC00LvRjyDQt9Cw0L/Rg9GB0LrRgyDRhtC40LrQu9GDINCw0L3RltC80LDRhtGW0Lkg0LTRgNGD0LPQvtGXINC80L7QvdC10YLQutC4XG4gICAgZnJhbWVDb3VudGVyKysgLy/Qt9Cx0ZbQu9GM0YjRg9GUIGZyYW1lQ291bnRlciDQutC+0LbQvdC+0LPQviDRgNCw0LfRgyDQutC+0LvQuCDQstGW0LTQsdGD0LLQsNGU0YLRjNGB0Y8g0LDQvdGW0LzQsNGG0ZbRjyDQv9C10YDRiNC+0Zcg0LzQvtC90LXRgtC60LhcbiAgICAvLyBjb25zb2xlLmxvZyhgY29pbiAke2ZyYW1lQ291bnRlcn1gKVxuXG4gICAgLy/Qv9GA0LjQsdC40YDQsNGU0LzQviDRgdGC0LjQu9GWINCw0L3RltC80LDRhtGW0Zcg0L/QtdGA0YjQvtCz0L4g0YXRg9C60LBcbiAgICBob29rV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiaG9vay1jYXRjaDEtdXBcIik7XG4gICAgaG9va0Zhc3RlbmluZy5jbGFzc0xpc3QucmVtb3ZlKFwiaG9vay1mYXN0ZXJpbmctY2F0Y2gxLXVwXCIpO1xuICAgIGhvb2tXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJob29rLWNhdGNoMS1kb3duXCIpO1xuICAgIGhvb2tGYXN0ZW5pbmcuY2xhc3NMaXN0LnJlbW92ZShcImhvb2stZmFzdGVyaW5nLWNhdGNoMS1kb3duXCIpO1xuXG4gICAgLy8g0L/RgNC40LHQuNGA0LDRlNC80L4g0LrQu9Cw0YHQuCDQstGW0LTQv9GA0LDRhtGM0L7QstCw0L3QvtGXINCw0L3RltC80LDRhtGW0Zcg0YDRg9GF0YMg0YLQsCDQtNC+0LTQsNGU0LzQviDQsNC90ZbQvNCw0YbRltGOINC30L3QuNC60L3QtdC90L3RjyDQvNC+0L3QtdGC0LrQuFxuICAgIGNvaW4zLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2luLWNhdGNoXCIpXG4gICAgY29pbjMuY2xhc3NMaXN0LmFkZChcImNvaW4tZGlzYXBwZWFyYW5jZVwiKVxuICAgIGNvaW4zLnN0eWxlLm9wYWNpdHkgPSBcIjBcIlxuXG4gICAgLy8g0LDQvdGW0LzQsNGG0ZbRjyDQvtC90L7QstC70LXQvdC90Y8gRlMg0L3QsCDRgtCw0LHQu9C40YbRliDQt9Cw0L/Rg9GB0LrQsNGU0YLRjNGB0Y8g0L/RltGB0LvRjyDQt9Cw0LLQtdGA0YjQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXINC30L3QuNC60L3QtdC90L3RjyDQv9C10YDRiNC+0Zcg0LzQvtC90LXRgtC60LhcbiAgICBpZihmcmFtZUNvdW50ZXIgPT09IDcpe1xuICAgICAgICBlbGVtc0luc2lkZUZTLmZvckVhY2goIChpdGVtLCBpKSAgPT4ge1xuICAgICAgICAgICAgaWYoIGkgPT09IDApe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIGl0ZW0udGV4dENvbnRlbnQgPSAnMSc7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntpdGVtLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjt9LCA1MDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSl7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udGV4dENvbnRlbnQgPSAnNSc7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvb2tXcmFwLmNsYXNzTGlzdC5hZGQoXCJob29rLW1vdmUtaG9yaXpvbnRhbDJcIik7IC8vINGW0L3RltGG0ZbRjtGU0LzQviDQsNC90ZbQvNCw0YbRltGOINGA0YPRhdGDINC00L4g0LTRgNGD0LPQvtGXINC80L7QvdC10YLQutC4XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMClcbiAgICAgICAgICAgICAgICB9LCAyMDApXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59KVxuY29pbjQuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCAoKT0+e1xuICAgIGZyYW1lQ291bnRlcisrIC8v0LfQsdGW0LvRjNGI0YPRlCBmcmFtZUNvdW50ZXIg0LrQvtC20L3QvtCz0L4g0YDQsNC30YMg0LrQvtC70Lgg0LLRltC00LHRg9Cy0LDRlNGC0YzRgdGPINCw0L3RltC80LDRhtGW0Y8g0LTRgNGD0LPQvtGXINC80L7QvdC10YLQutC4XG4gICAgLy8gY29uc29sZS5sb2coYGNvaW4gJHtmcmFtZUNvdW50ZXJ9YClcblxuICAgIC8v0L/RgNC40LHQuNGA0LDRlNC80L4g0YHRgtC40LvRliDQsNC90ZbQvNCw0YbRltGXINC00YDRg9Cz0L7Qs9C+INGF0YPQutCwXG4gICAgaG9va1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcImhvb2stY2F0Y2gyLXVwXCIpO1xuICAgIGhvb2tGYXN0ZW5pbmcuY2xhc3NMaXN0LnJlbW92ZShcImhvb2stZmFzdGVyaW5nLWNhdGNoMi11cFwiKTtcbiAgICBob29rV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiaG9vay1jYXRjaDItZG93blwiKTtcbiAgICBob29rRmFzdGVuaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJob29rLWZhc3RlcmluZy1jYXRjaDItZG93blwiKTtcblxuICAgIC8vINC/0YDQuNCx0LjRgNCw0ZTQvNC+INC60LvQsNGB0Lgg0LLRltC00L/RgNCw0YbRjNC+0LLQsNC90L7RlyDQsNC90ZbQvNCw0YbRltGXINGA0YPRhdGDINGC0LAg0LTQvtC00LDRlNC80L4g0LDQvdGW0LzQsNGG0ZbRjiDQt9C90LjQutC90LXQvdC90Y8g0LTRgNGD0LPQvtGXINC80L7QvdC10YLQutC4XG4gICAgY29pbjQuY2xhc3NMaXN0LnJlbW92ZShcImNvaW4tY2F0Y2hcIilcbiAgICBjb2luNC5jbGFzc0xpc3QuYWRkKFwiY29pbi1kaXNhcHBlYXJhbmNlXCIpXG4gICAgY29pbjQuc3R5bGUub3BhY2l0eSA9IFwiMFwiXG5cbiAgICAvLyDQsNC90ZbQvNCw0YbRltGPINC+0L3QvtCy0LvQtdC90L3RjyBSRkIg0YLQsCBFVVIg0L3QsCDRgtCw0LHQu9C40YbRliDQt9Cw0L/Rg9GB0LrQsNGU0YLRjNGB0Y8g0L/RltGB0LvRjyDQt9Cw0LLQtdGA0YjQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXINC30L3QuNC60L3QtdC90L3RjyDQtNGA0YPQs9C+0Zcg0LzQvtC90LXRgtC60LhcbiAgICBpZihmcmFtZUNvdW50ZXIgPT09IDE0KXtcbiAgICAgICAgZWxlbXNJbnNpZGVSRkIuZm9yRWFjaCggKGl0ZW0sIGkpICA9PiB7XG4gICAgICAgICAgICBpZiggaSA9PT0gMCl7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgaXRlbS50ZXh0Q29udGVudCA9ICcxJztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e2l0ZW0uc3R5bGUub3BhY2l0eSA9IFwiMVwiO30sIDUwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSAxKXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50ZXh0Q29udGVudCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICAgICAgfSwgMjAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBlbGVtc0luc2lkZUVVUi5mb3JFYWNoKCAoaXRlbSwgaSkgID0+IHtcbiAgICAgICAgICAgIGlmKCBpID09PSAwKXtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICBpdGVtLnRleHRDb250ZW50ID0gJzEnO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57aXRlbS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7fSwgNTAwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IDEpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnRleHRDb250ZW50ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQv9GA0LjRhdC+0LLRg9GU0LzQviDQtdC70LXQvNC10L3RgtC4INCz0YDQuCDRliDQstGW0LTQvtCx0YDQsNC20LDRlNC80L4g0LXQutGA0LDQvSDQt9Cw0LrRltC90YfQtdC90L3Rj1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lQm9keS5zdHlsZS5vcGFjaXR5ID0gXCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3R5bGUub3BhY2l0eSA9IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29pbnMuc3R5bGUub3BhY2l0eSA9IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU92ZXIuc3R5bGUub3BhY2l0eSA9IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU92ZXIuc3R5bGUuekluZGV4ID0gXCIxMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/Qu9C+0LPRltC60LAg0LrQvdC+0L/QutC4INCy0ZbQtNC60YDQuNGC0YLRjyDQv9C+0L/QsNC/0YMsINC00L7QtNCw0ZTRgtGM0YHRjyDQv9GW0YHQu9GPINCy0ZbQtNC+0LHRgNCw0LbQtdC90L3RjyDQtdC60YDQsNC90YMg0LfQsNC60ZbQvdGH0LXQvdC90Y8g0LPRgNC4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5zdHlsZS5vdmVyZmxvd1kgPSBcImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93LnN0eWxlLm9wYWNpdHkgPSBcIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvdy5zdHlsZS56SW5kZXggPSBcIjEwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcHVwSGFuZGxlcisrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL9C70L7Qs9GW0LrQsCDQutC90L7Qv9C60Lgg0LfQsNC60YDQuNGC0YLRjyDQv9C+0L/QsNC/0YMsINC00L7QtNCw0ZTRgtGM0YHRjyDQv9GW0YHQu9GPINCy0ZbQtNC+0LHRgNCw0LbQtdC90L3RjyDQtdC60YDQsNC90YMg0LfQsNC60ZbQvdGH0LXQvdC90Y8g0LPRgNC4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvc2VcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuc3R5bGUub3ZlcmZsb3dZID0gXCJ2aXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBXaW5kb3cuc3R5bGUub3BhY2l0eSA9IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93LnN0eWxlLnpJbmRleCA9ICctMTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3B1cEhhbmRsZXItLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYoZS50YXJnZXQgIT09IHBvcHVwV2luZG93ICYmIHBvcHVwSGFuZGxlciA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5zdHlsZS5vdmVyZmxvd1kgPSBcInZpc2libGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcG9wdXBXaW5kb3cuc3R5bGUub3BhY2l0eSA9IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBwb3B1cFdpbmRvdy5zdHlsZS56SW5kZXggPSAnLTEwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMClcbiAgICAgICAgICAgICAgICB9LCAyMDApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufSlcbmhvb2tXcmFwLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgKCkgPT4ge1xuICAgIGZyYW1lQ291bnRlcisrIC8vINC30LHRltC70YzRiNGD0ZQgZnJhbWVDb3VudGVyINC60L7QttC90L7Qs9C+INGA0LDQt9GDINC60L7Qu9C4INCy0ZbQtNCx0YPQstCw0ZTRgtGM0YHRjyDQsNC90ZbQvNCw0YbRltGPINGF0YPQutCwXG4gICAgLy8gY29uc29sZS5sb2coZnJhbWVDb3VudGVyKVxuICAgIGlmKGZyYW1lQ291bnRlciA9PT0gMSl7IC8v0YTRltC60YHQsNGG0ZbRjyDRhdGD0LrQsCDQv9C10YDQtdC0INC/0LXRgNGI0L7RjiDQvNC+0L3QtdGC0L7RjlxuICAgICAgICBob29rV3JhcC5jbGFzc0xpc3QuYWRkKFwiaG9vay1wb3NpdGlvbi1jYXRjaDFcIilcbiAgICB9XG4gICAgaWYoZnJhbWVDb3VudGVyID09PSAzKXsgLy8g0LvQvtCz0ZbQutCwINGA0YPRhdGDINC/0LXRgNGI0L7RlyDQvNC+0L3QtdGC0LrQuCDQv9GW0YHQu9GPINGC0L7Qs9C+INGP0Log0ZfRlyDRhdGD0LrQvdGD0LvQuFxuICAgICAgICBjb2luMy5jbGFzc0xpc3QuYWRkKFwiY29pbi1jYXRjaFwiKVxuICAgICAgICBob29rV3JhcC5jbGFzc0xpc3QuYWRkKFwiaG9vay1jYXRjaDEtdXBcIik7XG4gICAgICAgIGhvb2tGYXN0ZW5pbmcuY2xhc3NMaXN0LmFkZChcImhvb2stZmFzdGVyaW5nLWNhdGNoMS11cFwiKTtcbiAgICB9XG4gICAgaWYoZnJhbWVDb3VudGVyIDwgNyl7IC8vINC70L7Qs9GW0LrQsCDQsNC90ZbQvNCw0YbRltGXINGA0YPRhdGDINGF0YPQutCwINC00L4g0L/QtdGA0YjQvtGXINC80L7QvdC10YLQutC4XG4gICAgICAgIGhvb2tXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJob29rLW1vdmUtaG9yaXpvbnRhbFwiKTtcbiAgICAgICAgaG9va1dyYXAuY2xhc3NMaXN0LmFkZChcImhvb2stY2F0Y2gxLWRvd25cIik7XG4gICAgICAgIGhvb2tGYXN0ZW5pbmcuY2xhc3NMaXN0LmFkZChcImhvb2stZmFzdGVyaW5nLWNhdGNoMS1kb3duXCIpO1xuICAgIH1cbiAgICBpZihmcmFtZUNvdW50ZXIgPT09IDgpeyAvLyDQu9C+0LPRltC60LAg0LDQvdGW0LzQsNGG0ZbRlyDRgNGD0YXRgyDRhdGD0LrQsCDQtNC+INC00YDRg9Cz0L7RlyDQvNC+0L3QtdGC0LrQuFxuICAgICAgICBob29rV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiaG9vay1tb3ZlLWhvcml6b250YWwyXCIpO1xuICAgICAgICBob29rV3JhcC5jbGFzc0xpc3QuYWRkKFwiaG9vay1wb3NpdGlvbi1jYXRjaDJcIilcbiAgICAgICAgaG9va1dyYXAuY2xhc3NMaXN0LmFkZChcImhvb2stY2F0Y2gyLWRvd25cIik7XG4gICAgICAgIGhvb2tGYXN0ZW5pbmcuY2xhc3NMaXN0LmFkZChcImhvb2stZmFzdGVyaW5nLWNhdGNoMi1kb3duXCIpO1xuICAgIH1cbiAgICBpZihmcmFtZUNvdW50ZXIgPT09IDEwKXsgLy8g0LvQvtCz0ZbQutCwINGA0YPRhdGDINC00YDRg9Cz0L7RlyDQvNC+0L3QtdGC0LrQuCDQv9GW0YHQu9GPINGC0L7Qs9C+INGP0Log0ZfRlyDRhdGD0LrQvdGD0LvQuFxuICAgICAgICBob29rV3JhcC5jbGFzc0xpc3QuYWRkKFwiaG9vay1jYXRjaDItdXBcIik7XG4gICAgICAgIGhvb2tGYXN0ZW5pbmcuY2xhc3NMaXN0LmFkZChcImhvb2stZmFzdGVyaW5nLWNhdGNoMi11cFwiKTtcbiAgICAgICAgY29pbjQuY2xhc3NMaXN0LmFkZChcImNvaW4tY2F0Y2hcIilcbiAgICB9XG59KTsiXX0=
