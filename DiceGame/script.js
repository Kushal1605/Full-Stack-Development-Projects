document.querySelector("button").addEventListener("click", clickEvent);


function clickEvent() {

    var player1Score = Math.floor(Math.random() * 6 + 1);
    var player2Score = Math.floor(Math.random() * 6 + 1);

    var player1Image = './images/dice' + player1Score + '.png';
    var player2Image = './images/dice' + player2Score + '.png';

    document.getElementById('img1').src = player1Image
    document.getElementById('img2').src = player2Image

    if(player1Score > player2Score) {
    document.getElementById('title').textContent = 'Player 1 Wins!'
    } else if(player1Score < player2Score) {
    document.getElementById('title').textContent = 'Player 2 Wins!'
    } else {
    document.getElementById('title').textContent = 'Draw!'
    }
}