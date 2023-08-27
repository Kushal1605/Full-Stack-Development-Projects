var start = false;
var color = ['green', 'red', 'yellow', 'blue']

var level = 0
var userSequence = new String()
var generatedSequence = new String()

// Start the Game
$('.game').click(function () {
    if(!start) generateSequence()
    start = true
})

// Handling user click on the color blocks
$('.item').off('click').on('click', function () {
    // If game has started (If Game Over then it should not work)
    if(start) {
        userSequence += this.classList[2]
        // User click Animation with sound
        $('.' + this.classList[2]).addClass('pressed')
        new Audio('./sounds/' + this.classList[1] + '.mp3').play()
        setTimeout(() => {
        $('.' + this.classList[2]).removeClass('pressed')
        }, 100);

        validateSequence(userSequence.length - 1)
    }
})

// Validate if sequence is correct or not
function validateSequence(index) {
    // If correct
    if(userSequence[index] === generatedSequence[index]) {
        // If level completed then move to next level and generate new sequence
        if(userSequence.length == generatedSequence.length) {
        setTimeout(() => {
            generateSequence()
        }, 1000);
        }
    }
    // Incorrect Sequence => Game Over! 
    else {
        $('#header').text('Game Over!')
        $('body').addClass('gameOver')
        new Audio('./sounds/wrong.mp3').play();
        setTimeout(() => {
            $('body').removeClass('gameOver')
        }, 200);
        $('.game').text('Start Again')
        startOver()
    }
}

// If Game Over then start from level 1
function startOver() {
    level = 0
    userSequence = new String()
    generatedSequence = new String()
    start = false
}
// A random blink to generate Sequence for user
function generateSequence() {
    userSequence = new String()
    // Update Level
    level += 1
    $('#header').text('Level ' + level)
    
    // Random color block to blink with Audio
    var num = Math.floor(Math.random() * 4)
    new Audio('./sounds/' + color[num] + '.mp3').play()
    $('.' + color[num]).fadeIn(100).fadeOut(100).fadeIn(100)
    generatedSequence += num.toString()
}