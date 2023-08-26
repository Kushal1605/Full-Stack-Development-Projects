var gameOver = 0;

$(document).keydown(function(e) {
    if((e.key === 'a' || e.key == 'A') && gameOver === 0) gameStart(e.key)
})
function gameStart(key) {

    gameOver = 1
    var count = 0, userSequence = new String(), sequence = new String(), level = 1

    // Start from Level 1
    $('#header').text('Level: ' + level)  

    // Initial blink  
    sequence = generateRandNum(new String())   

    // Counter to check for the sequence
    count = 0

    // User clicks on the coloured block
    $('.item').off('click').on('click', function () {
        console.log('curr Sequence: ' + sequence)
        // Blink
        $('.' + this.classList[2]).addClass('pressed')
        
        // Audio
        new Audio('./sounds/' + this.classList[1] + '.mp3').play()

        // Delay
        setTimeout(() => {
            $('.' + this.classList[2]).removeClass('pressed')
        }, 500);

        // Storing user sequence
        userSequence += this.classList[2].toString()
        
        // Wrong Sequence => Game Over
        if(userSequence[count] !== sequence[count]) {

            console.log('Game Over: ' + sequence + " " + userSequence)
            $('#header').text('Game Over! Press A key to restart the game')

            // Background Change
            $('body').addClass('gameOver')

            // Game Over Audio
            new Audio('./sounds/wrong.mp3').play()

            // Delay
            setTimeout(() => {
                $('body').removeClass('gameOver')
            }, 500);

            // KeyPress event to work again
            gameOver = 0
            
            // Reset sequence and user sequence
            sequence = new String()
            userSequence = new String()
            return
        }
        count += 1 
        if(userSequence.length == sequence.length)  {

            // Delay for next blink
            setTimeout(() => {
                sequence = generateRandNum(sequence)
            }, 1000);

            // Resetting the user sequence and counter before moving to the next level
            count = 0
            userSequence = new String()

            // Moving to next level
            level += 1;

            // Update Level
            $('#header').text('Level: ' + level)
        }
    })
}

function generateRandNum(sequence) {
    // Random blink
    var randNum = Math.floor(Math.random() * 4)
    $('.' + randNum).addClass('pressed')
    switch (randNum) {
        case 0:
            new Audio('./sounds/green.mp3').play()
            break;
        case 1:
            new Audio('./sounds/red.mp3').play()
            break;
        case 2:
            new Audio('./sounds/yellow.mp3').play()
            break;
        case 3:
            new Audio('./sounds/blue.mp3').play()
            break;        
        default:
            break;
    }
    setTimeout(() => {
        $('.' + randNum).removeClass('pressed')
    }, 500);

    // Storing the random sequence to match with the user sequence
    sequence += randNum.toString()
    console.log(sequence)

    return sequence
}