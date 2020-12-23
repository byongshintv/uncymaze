
const soundes = {
  pop : new Audio("https://static.miraheze.org/libertygamewiki/4/40/Uncymaze_pop.ogg"),
  disappear : new Audio("https://static.miraheze.org/libertygamewiki/b/b6/Uncymaze_disappear.ogg"),
  bgm : new Audio("https://static.miraheze.org/libertygamewiki/d/d0/Uncymaze_bgm.ogg"),
  cursor: new Audio("https://static.miraheze.org/libertygamewiki/e/e3/Uncymaze_cursor.ogg"),
  menu : new Audio("https://static.miraheze.org/libertygamewiki/7/7c/Uncymaze_menu.ogg"),
  cancel : new Audio("https://static.miraheze.org/libertygamewiki/7/76/Uncymaze_cancel.ogg"),
  action : new Audio("https://static.miraheze.org/libertygamewiki/0/07/Uncymaze_action.ogg")
}
/*
const soundes = {
  pop : new Audio("https://soundeffect-lab.info/sound/button/mp3/decision44.mp3"),
  disappear : new Audio("https://soundeffect-lab.info/sound/button/mp3/decision31.mp3"),
  bgm : new Audio("https://peritune.com/music/PerituneMaterial_Prairie4.mp3"),
  cursor: new Audio("https://soundeffect-lab.info/sound/button/mp3/cursor7.mp3"),
  menu : new Audio("https://soundeffect-lab.info/sound/button/mp3/decision40.mp3"),
  cancel : new Audio("https://soundeffect-lab.info/sound/button/mp3/cancel4.mp3"),
  action : new Audio("https://soundeffect-lab.info/sound/button/mp3/decision22.mp3")
}*/
soundes.bgm.volume = 0.8;
const $$ = function(callback){
  return new Promise((res,rej) => {
    callback(res)
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function opening(){
  $(".main > .opening").removeClass("hide");
  const setting = { duration : 1500, wait: 2000}
    var animes = [anime({
      targets: '.opening .title',
      translateY: [100,0],
      scale: [0,1],
      duration:1500,
      //easing: 'easeInOutSine'
      autoplay:false,
      direction: 'alternate',
    }),
     anime({
      targets: '.opening .descript',
      translateY: [-100,0],
      scale: [0,1],
      duration:1500,
      autoplay:false,
       direction: 'alternate',
    })];
    soundes.disappear.play();
    animes.forEach(e => e.play())
    await sleep(setting.duration * 1.9)
   soundes.pop.play();
    await sleep(setting.duration * 0.2)
}

async function main(){
    soundes.bgm.play();
    const $square = $(`<i class="square">◆</i>`); 
    $(".main > .lobby").removeClass("hide");
    $(".main > li").eq(0).addClass("active");
    $(".menu li").append($square).prepend($square)
    anime({
      targets: '.lobby .title',
      translateY: [100,0],
      opacity: [0,1],
      duration:1500,
      easing:"easeOutCubic"
    });
    $(document.body).on("keydown",({key}) => {
      // 커서이동
      const isPopupVisible = !$(".popup").hasClass("hide")
      if( ["ArrowRight","ArrowLeft"].includes(key) && !isPopupVisible ){
          soundes.cursor.cloneNode().play();
          cursor.move(key === "ArrowLeft")
      }
      // 결정키
      if( key === "Enter" & !isPopupVisible){
        soundes.action.cloneNode().play();
        switch( $(".active").data("target") ){
          case "howto": popup.show("howto"); break;
          case "ranking": popup.show("ranking"); break;;
          case "exit": location = document.referrer; break;
        }
      }
      // esc
      if( key === "Escape" & isPopupVisible){
        soundes.cancel.cloneNode().play();
        popup.hide();
      }
      if( key === "Escape" & !isPopupVisible){
        soundes.cancel.cloneNode().play();
        cursor.hover(3)
      }
      
    })
    
}
const cursor = {
  move:(isLeft) => {
     const addValue = isLeft ? -1 : 1;
     const $root = $(".menu .active").closest(".menu"); 
     const l = $root.find("li").length;
     const i = ($(".menu .active").removeClass("active").index() + addValue) % l
     $root.find("li").eq(i).addClass("active")
  },
  hover:(i) => {
    $(".menu > li").removeClass("active");
    $(".menu:not(.hide) > li").eq(i).addClass("active")
  }
}
const popup = {
  show:async (target) => {
    const [$popup, $target] = [$(`.popup`),  $(`.popup .${target}`)];
    [$popup, $target].forEach($e => $e.removeClass("hide"));
    await anime({
      targets: ".popup",
      easing: 'easeOutExpo',
      duration: 300,
      scale: [0,1]
    })
   
  },
  hide:async () => {
    await anime({
      targets: ".popup",
      easing: 'easeOutExpo',
      duration: 300,
      scale: [1,0]
    }).finished
    $(`.popup .container > *, .popup`).addClass("hide");
    
  }
}
$(".popup .left").on("click",() => {
  soundes.cancel.cloneNode().play();
  popup.hide();
  
})


async function init(){
  await opening();
  await main();
}

//init();