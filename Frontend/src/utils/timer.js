import { Timer } from "timer-node";

function timer(object) {
    const startTime = new Date(object?.time)
    const timer = new Timer({ label: 'test-timer', startTimestamp: startTime })
    timer.start();
    var startObject = "";
    if(timer.time().d > 1){
        startObject = timer.time().d + " days"
    }
    else if(timer.time().h > 1){
        startObject = timer.time().h + " hours"
    }
    else if(timer.time().m <= 1){
        startObject = timer.time().h + " minute"
    }
    else{
        startObject = timer.time().m + " minutes"
    }
    return startObject;
}

export default timer;