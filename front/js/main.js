const startGameBtn = document.querySelector('.main__game-machine-btn');
const startText = document.querySelector(".start-text");

const hookWrap = document.querySelector('.hook-wrap'); // батьківський елемент в якому знаходиться хук
const hookFastening = document.querySelector('.hook-fastering'); // елемент кріплення хука до gamebody

const gameBody = document.querySelector(".game-body"); // елемент до якого кріпиться хук і лінія на якій він спускається до монеток
const result = document.querySelector(".result"); // таблиця результатів гри
const coins = document.querySelector(".coins") // батьківський елемент монеток
const gameOver = document.querySelector(".gameOver"); // екран який відображається по закінченню гри

const popupBtn = document.querySelector(".gameOver__info");
const popupWindow = document.querySelector(".popup")
const popupClose = document.querySelector(".popup__close");

const FS = document.querySelector(".FS")
const elemsInsideFS = FS.querySelectorAll("span") //span елементи в які записується результат FS
const RFB = document.querySelector(".RFB")
const elemsInsideRFB = RFB.querySelectorAll("span")  //span елементи в які записується результат RFB
const RON = document.querySelector(".RON")
const elemsInsideRON = RON.querySelectorAll("span")  //span елементи в які записується результат RON
const coin3 = document.querySelector(".coin3") // монетка яка буде спіймана першою
const coin4 = document.querySelector(".coin4") // монетка яка буде спіймана другою
let frameCounter = 0 // потрібен для відстежування ключових точок анімації
let animationHandler = false
// let popupHandler = 0 // відстежує відкритий попап чи ні
startGameBtn.addEventListener("click", () => {
    if (!animationHandler){
        animationHandler = true
        startText.style.display = "none"
        hookWrap.classList.add("hook-move-horizontal"); // запуск гри
    }
    if(animationHandler){
        startGameBtn.classList.add("btn-off")
    }


});

coin3.addEventListener("animationend", () =>{ // відстежуємо момент закінчкення анімації першого монетки для запуску циклу анімацій другої монетки
    frameCounter++ //збільшує frameCounter кожного разу коли відбувається анімація першої монетки
    // console.log(`coin ${frameCounter}`)

    //прибираємо стилі анімації першого хука
    hookWrap.classList.remove("hook-catch1-up");
    hookFastening.classList.remove("hook-fastering-catch1-up");
    hookWrap.classList.remove("hook-catch1-down");
    hookFastening.classList.remove("hook-fastering-catch1-down");

    // прибираємо класи відпрацьованої анімації руху та додаємо анімацію зникнення монетки
    coin3.classList.remove("coin-catch")
    coin3.classList.add("coin-disappearance")
    coin3.style.opacity = "0"

    // анімація оновлення FS на таблиці запускається після завершення анімації зникнення першої монетки
    if(frameCounter === 7){
        elemsInsideFS.forEach( (item, i)  => {
            if( i === 0){
                item.style.opacity = "0";
                item.textContent = '5';
                setTimeout(() =>{item.style.opacity = "1";}, 500)
            }
            if (i === 1){
                setTimeout(() =>{
                    item.style.opacity = "0";
                    item.textContent = '0';
                    setTimeout(() =>{
                        item.style.opacity = "1";
                        hookWrap.classList.add("hook-move-horizontal2"); // ініціюємо анімацію руху до другої монетки
                    }, 500)
                }, 200)

            }
        })
    }
})
coin4.addEventListener("animationend", ()=>{
    frameCounter++ //збільшує frameCounter кожного разу коли відбувається анімація другої монетки
    // console.log(`coin ${frameCounter}`)

    //прибираємо стилі анімації другого хука
    hookWrap.classList.remove("hook-catch2-up");
    hookFastening.classList.remove("hook-fastering-catch2-up");
    hookWrap.classList.remove("hook-catch2-down");
    hookFastening.classList.remove("hook-fastering-catch2-down");

    // прибираємо класи відпрацьованої анімації руху та додаємо анімацію зникнення другої монетки
    coin4.classList.remove("coin-catch")
    coin4.classList.add("coin-disappearance")
    coin4.style.opacity = "0"

    // анімація оновлення RFB та RON на таблиці запускається після завершення анімації зникнення другої монетки
    if(frameCounter === 14){
        elemsInsideRFB.forEach( (item, i)  => {
            if( i === 0){
                item.style.opacity = "0";
                item.textContent = '2';
                setTimeout(() =>{item.style.opacity = "1";}, 500)
            }
            if (i === 1){
                setTimeout(() =>{
                    item.style.opacity = "0";
                    item.textContent = '5';
                    setTimeout(() =>{
                        item.style.opacity = "1";
                    }, 500)
                }, 200)
            }
        })
        elemsInsideRON.forEach( (item, i)  => {
            if( i === 0){
                item.style.opacity = "0";
                item.textContent = '2';
                setTimeout(() =>{item.style.opacity = "1";}, 500)
            }
            if (i === 1){
                setTimeout(() =>{
                    item.style.opacity = "0";
                    item.textContent = '5';
                    setTimeout(() =>{
                        item.style.opacity = "1";
                        // приховуємо елементи гри і відображаємо екран закінчення
                        setTimeout(() =>{
                            gameBody.style.opacity = "0"
                            result.style.opacity = "0"
                            coins.style.opacity = "0"
                            gameOver.style.opacity = "1"
                            gameOver.style.zIndex = "10"
                            //логіка кнопки відкриття попапу, додається після відображення екрану закінчення гри
                            popupBtn.addEventListener("click", () =>{
                                document.querySelector("body").style.overflowY = "hidden"
                                popupWindow.style.opacity = "1"
                                popupWindow.style.zIndex = "100"
                                // popupHandler++
                            })
                            //логіка кнопки закриття попапу, додається після відображення екрану закінчення гри
                            popupClose.addEventListener("click", () =>{
                                console.log("close")
                                document.querySelector("body").style.overflowY = "visible"
                                popupWindow.style.opacity = "0"
                                popupWindow.style.zIndex = '-100'
                                // popupHandler--
                            })
                            // document.addEventListener("click", (e) =>{
                            //     if(e.target !== popupWindow && popupHandler === 1){
                            //         console.log("close")
                            //         document.querySelector("body").style.overflowY = "visible"
                            //         popupWindow.style.opacity = "0"
                            //         popupWindow.style.zIndex = '-100'
                            //     }
                            // })
                        }, 500)
                    }, 500)
                }, 200)
            }
        })
    }
})
hookWrap.addEventListener("animationend", () => {
    frameCounter++ // збільшує frameCounter кожного разу коли відбувається анімація хука
    // console.log(frameCounter)
    if(frameCounter === 1){ //фіксація хука перед першою монетою
        hookWrap.classList.add("hook-position-catch1")
    }
    if(frameCounter === 3){ // логіка руху першої монетки після того як її хукнули
        coin3.classList.add("coin-catch")
        hookWrap.classList.add("hook-catch1-up");
        hookFastening.classList.add("hook-fastering-catch1-up");
    }
    if(frameCounter < 7){ // логіка анімації руху хука до першої монетки
        hookWrap.classList.remove("hook-move-horizontal");
        hookWrap.classList.add("hook-catch1-down");
        hookFastening.classList.add("hook-fastering-catch1-down");
    }
    if(frameCounter === 8){ // логіка анімації руху хука до другої монетки
        hookWrap.classList.remove("hook-move-horizontal2");
        hookWrap.classList.add("hook-position-catch2")
        hookWrap.classList.add("hook-catch2-down");
        hookFastening.classList.add("hook-fastering-catch2-down");
    }
    if(frameCounter === 10){ // логіка руху другої монетки після того як її хукнули
        hookWrap.classList.add("hook-catch2-up");
        hookFastening.classList.add("hook-fastering-catch2-up");
        coin4.classList.add("coin-catch")
    }
});