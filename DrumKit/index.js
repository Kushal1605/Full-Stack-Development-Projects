function clickEvent() {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML)
    buttonAnimation(buttonInnerHTML)
}
function makeSound(key) {
    buttonAnimation(key)
    switch (key) {
        case 'w':
            new Audio('./sounds/tom-1.mp3').play();
            break;
        case 'a':
            new Audio('./sounds/tom-2.mp3').play();
            break;
        case 's':
            new Audio('./sounds/tom-3.mp3').play();
            break;
        case 'd':
            new Audio('./sounds/tom-4.mp3').play();
            break;
        case 'j':
            new Audio('./sounds/snare.mp3').play();
            break;
        case 'k':
            new Audio('./sounds/kick-bass.mp3').play();
            break;
        case 'l':
            new Audio('./sounds/crash.mp3').play();
            break;
        default:
            break;
    }
}

function buttonAnimation(key) {
    document.querySelector('.' + key).classList.add('pressed')
    setTimeout(function () {
        document.querySelector('.' + key).classList.remove('pressed')
    }, 100)
}
for(var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", clickEvent);
}

document.addEventListener('keydown', (e) => makeSound(e.key))
