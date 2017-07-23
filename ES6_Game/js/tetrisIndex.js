require('../css/tetris.css')
require('../js/tetris/comFun.js')
require('../js/tetris/ResourceManager.js')
require('../js/tetris/config.js')
import Tetris from './tetris/Tetris.js'

// 加载虚拟键盘
let gamepadObj = require('../js/tetris/gamepad.js')
let gamepad = new gamepadObj()
let gameInst
if(screen.width < 481 || window.screen.width < 481) {
  gamepad.draw()
}


// 开始游戏界面
function _init() {
  $('#btn-start').on('click', function (e) {
    $('.start-container').css('display','none')
    $('.game-container').css('display','block')
    $('#gamepad').css('display','block')
    startGame()
  })

  $('#btn-setting').on('click', function (e) {
    $('.modal-dialog').css('display', 'block')
  })

  $('#btn-game-setting').on('click', function (e) {
    $('.modal-dialog').css('display', 'block')
    gameInst.pause()
  })

  $('#btn-dialog-close').on('click',function(){
    $('.modal-dialog').css('display', 'none')
    gameInst.resume()
  })

  $('#ck-sound').on('change',function(){
    var enable = $('#ck-sound').get().checked
    window.TetrisConfig.config.enableSound = enable
  })

  $('#btn-game-pause').on('click', function (e) {
    console.log('暂停')
    let el = e.target
    if (gameInst._state !== 'over'){
      if (el.innerText === '暂停') {
        el.innerText = '继续'
        gameInst.pause()
      } else {
        el.innerText = '暂停'
        gameInst.resume()
      }
    }
  })

}
document.addEventListener('DOMContentLoaded', function(e){
  _init()
})

function startGame() {
  ResourceManager.onResourceLoaded = function(){
    gameInst = new Tetris()
    gameInst.startGame()
  }
  ResourceManager.init()
}
