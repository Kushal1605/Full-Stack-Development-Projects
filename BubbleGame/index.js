const startBtn = document.querySelector('.start-btn')
const mainPanel = document.querySelector('.main-panel')
var isGameStarted = false
var time = 30
var score = 0
var numberToBeHit
var interval_ID


const availableWidth = window.innerWidth * 0.8;
const availableHeight = mainPanel.clientHeight
const bubbleWidth = 64
const bubbleHeight = 64
const bubbleCountInWidth = Math.floor((availableWidth - 10) / bubbleWidth)
const bubbleCountInHeight = Math.floor((availableHeight - 10) / bubbleHeight)
const bubbleCount = bubbleCountInHeight * bubbleCountInWidth

console.log(`availableWidth: ${availableWidth} bubbleCount: ${bubbleCount} availableHeight ${availableHeight}`)

startBtn.addEventListener('click', () => {
    if(!isGameStarted) {
        startGame()
    } else {
        endGame()
    }
})

document.querySelector('.main-panel').addEventListener('click', (e) => {
    userClickEvent(e)
})

function startGame() {
    mainPanel.innerHTML = ''
    time = 30
    isGameStarted = true
    startBtn.innerHTML = 'Quit Game'
    document.querySelector('.timer').innerHTML = `Time: ${time}`
    document.querySelector('.score').innerHTML = `Score: ${score}`

    generateBubble()
    generateRandomNumber()
    randomNumberToBeHit()
    startCountDown()

}
function startCountDown() {
    interval_ID = setInterval(() => {
    if(time > 0) {
        runTimer()
    } else {
        clearInterval(interval_ID)
        endGame()
    }
}, 1000);
}

function generateBubble() {
    for(let i = 0; i < bubbleCount; i++) {
        const bubbleEle = document.createElement('div')
        bubbleEle.classList.add('bubble')
        bubbleEle.id = `bubble-${i}`
        mainPanel.appendChild(bubbleEle)
    }    
}
function generateRandomNumber() {
    for(let i = 0; i < bubbleCount; i++) {
        var randNum = Math.floor(Math.random() * 10)
        document.getElementById(`bubble-${i}`).innerHTML = randNum 
    }
}

function randomNumberToBeHit() {
    numberToBeHit = Math.floor(Math.random() * 10)
    document.querySelector('.hit-number').innerHTML = `Hit: ${numberToBeHit}`
}

function runTimer() {
    time -= 1;
    if(time < 11) {
        document.querySelector('.timer').classList.toggle('red-popup')
    }
    document.querySelector('.timer').innerHTML = `Time: ${time}`
}

function userClickEvent(e) {
    if(e.target.innerHTML == numberToBeHit) {
        score += 10
        randomNumberToBeHit();
        document.querySelector('.score').innerHTML = `Score: ${score}`
        for(let i = 0; i < bubbleCount; i++) {
            document.querySelector(`#bubble-${i}`).classList.toggle('fade');
        }
        generateRandomNumber()
        setTimeout(() => {
            for(let i = 0; i < bubbleCount; i++) {
                document.querySelector(`#bubble-${i}`).classList.toggle('fade');
            }
        }, 100);
    }
}

function endGame() {
    if(document.querySelector('.timer').classList[1] === 'red-popup') document.querySelector('.timer').classList.remove('red-popup') 
    time = 0
    startBtn.innerHTML = 'Play Again'
    mainPanel.innerHTML = `<h1 class='game-over'> Game Over. Your Score is ${score} </h1>`
    score = 0
    isGameStarted = false
}
