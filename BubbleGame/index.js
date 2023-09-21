const startBtn = document.querySelector('.start-btn')
const mainPanel = document.querySelector('.main-panel')
var isGameStarted = false
var time = 30
var score = 0
var numberToBeHit
var flag = false

// Dynamically setting the number of bubbles according to the height and width of the screen.
const availableWidth = window.innerWidth * 0.8;
const availableHeight = mainPanel.clientHeight
const bubbleWidth = 64
const bubbleHeight = 64
const bubbleCountInWidth = Math.floor((availableWidth - 10) / bubbleWidth)
const bubbleCountInHeight = Math.floor((availableHeight - 10) / bubbleHeight)
const bubbleCount = bubbleCountInHeight * bubbleCountInWidth

// Start the game after clicking the start button.
startBtn.addEventListener('click', () => {
    if(!isGameStarted) {
        startGame()
    } else {
        endGame()
    }
})

document.querySelector('.main-panel').addEventListener('click', (e) => {
    flag = false
    userClickEvent(e)
})

// Function to start the game.
function startGame() {
    mainPanel.innerHTML = ''
    time = 30
    score = 0
    isGameStarted = true
    startBtn.innerHTML = 'Quit Game'
    document.querySelector('.timer').innerHTML = `Time: ${time}s`
    document.querySelector('.score').innerHTML = `Score: ${score}`

    generateBubble()
    generateRandomNumber()
    randomNumberToBeHit()
    startCountDown()

}

// Start the timer.
function startCountDown() {
    var interval_ID = setInterval(() => {
    if(time > 0) {
        runTimer()
    } else {
        clearInterval(interval_ID)
        endGame()
    }
}, 1000);
}

// Create bubbles.
function generateBubble() {
    mainPanel.innerHTML = ''
    for(let i = 0; i < bubbleCount; i++) {
        const bubbleEle = document.createElement('div')
        bubbleEle.classList.add('bubble')
        bubbleEle.id = `bubble-${i}`
        mainPanel.appendChild(bubbleEle)
    }    
}

// Generating random numbers for each bubbles
function generateRandomNumber() {
    for(let i = 0; i < bubbleCount; i++) {
        var randNum = Math.floor(Math.random() * 10)
        document.getElementById(`bubble-${i}`).innerHTML = randNum 
    }
}

// Generating a random number to be hit.
function randomNumberToBeHit() {
    numberToBeHit = Math.floor(Math.random() * 10)
    document.querySelector('.hit-number').innerHTML = `Hit: ${numberToBeHit}`
}

// Decreasing the value of time by 1 each second.
function runTimer() {
    time -= 1;
    if(time < 11) {
        document.querySelector('.timer').classList.toggle('red-popup')
    }
    document.querySelector('.timer').innerHTML = `Time: ${time}s`
}

// Event after user click on a bubble either correct or wrong.
function userClickEvent(e) {
    if(e.target.innerHTML == numberToBeHit) {
        for(let i = 0; i < bubbleCount; i++) {
            if(document.querySelector(`#bubble-${i}`).style.backgroundColor === 'rgb(206, 28, 15)') {
                document.querySelector(`#bubble-${i}`).style.backgroundColor = ''
            }
        }
        score += 10
        e.target.style.animationName = 'rotate'
        e.target.style.animationDuration ='1s'
        e.target.style.backgroundColor = 'rgb(0, 208, 255)'
        
        setTimeout(() => {
            // mainPanel.innerHTML = ''
            if(time > 1) {
                generateBubble()
                generateRandomNumber()
            }
            randomNumberToBeHit();
            document.querySelector('.score').innerHTML = `Score: ${score}`
        }, 1000);
        flag = true
    } else if(e.target.classList[0] == 'bubble' && !flag) {
        e.target.style.animationName = 'rotate'
        e.target.style.animationDuration ='1s'
        e.target.style.backgroundColor = 'rgb(206, 28, 15)'
        flag = false
    }
}

// End the game if timer ends or user quits the game
function endGame() {
    if(document.querySelector('.timer').classList[1] === 'red-popup') document.querySelector('.timer').classList.remove('red-popup') 
    time = 0
    startBtn.innerHTML = 'Play Again'   
    mainPanel.innerHTML = `<h1 class='game-over'> Game Over. Your Score is ${score} </h1>`
    isGameStarted = false
}
