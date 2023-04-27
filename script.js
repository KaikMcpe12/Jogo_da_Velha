var cellElements = document.querySelectorAll('.cell')
var boxMsg = document.querySelector(".message")
var board = document.querySelector('.board')
var msg = document.querySelector(".message-text")

var p_playerX = document.querySelector(".playerX")
var p_playerO = document.querySelector(".playerO")

var restartButton = document.querySelector(".restart-button")
var continueButton = document.querySelector(".continue-button")

var playerMark = randomPlayer()
var playerX
var playerO

var combinationWin = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function restart(){
  playerX = 0
  playerO = 0
  start()
}

function start(){
  //Mostrar os pontos
  mostPoints()
  
  //Muda jogador e adiciona jogador a body
  swapTurn()
  
  for (cell of cellElements){
    cell.classList.add("cellHover")
    cell.innerText = ""
    cell.addEventListener("click", play, {once:true})
  }
  
  boxMsg.classList.remove("show-message")
}

function randomPlayer(){
  let players = ["X","O"]
  let indice = Math.floor(Math.random()*2)
  return players[indice]
}

function swapTurn(){
  playerMark = playerMark=="O" ? "X" : "O"
  
  //Muda o hover do jogador
  board.classList.remove('O')
  board.classList.remove('X')
  
  board.classList.add(playerMark)
}

function checkForWin(){
  return combinationWin.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].innerText == playerMark
     })
  })
}

function checkForDraw(){
  return [... cellElements].every((cell) => {
    return cell.innerText == "X" || cell.innerText == "O"
  })
}

function endMessage(){
  if (isWin){
    msg.innerText = `${playerMark} Venceu!`
    
    //Acrescenta os pontos do vencedor
    playerPoints()
  }else if(isDraw){
    msg.innerText = "Empate"
  }
  boxMsg.classList.add("show-message")
}

function playerPoints(){
  if (playerMark == "X"){
    playerX ++
  } else {
    playerO ++
  }
}

function mostPoints(){
  p_playerX.innerText = playerX
  p_playerO.innerText = playerO
}

function play(e){
  //Colocar a marca
  let cell = e.target
  cell.innerText = playerMark
  
  //Retira o hover
  cell.classList.remove("cellHover")
  
  //Veirifica por vitória
  isWin = checkForWin()
  //Verifica por empate
  isDraw = checkForDraw()
  
  if (isWin || isDraw){
    endMessage()
  } else {
    //Troca de jogador
    swapTurn()
  }
}

restart()

restartButton.addEventListener("click", restart)

continueButton.addEventListener("click", start)