counter=0
seconds=0
minutes=0

function timer() {
    intervalTimer = setTimeout(addToChrono, 1000);
}

function addToChrono() {
    tick();
    secondsToWrite = (seconds<10) ? `0${seconds}` : `${seconds}`
    minutesToWrite = (minutes<10) ? `0${minutes}` : `${minutes}`
    console.log(minutesToWrite,secondsToWrite)
    const chronoElt = document.getElementById('chrono')
    chronoElt.innerHTML = `${minutesToWrite}:${secondsToWrite}`
    const counterElt = document.getElementById('counter')
    counterElt.value = `${counter}`
    timer()
}

function tick(){
    counter++
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
}

function clearTimer(counter,seconds,minutes){
    return counter=0,seconds=0,minutes=0
}

window.onload = timer()

