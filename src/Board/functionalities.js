export function checkForWumpus(agentAddress, cells){
    if(agentAddress%10 !== 0 && cells[agentAddress-1] === 'W') return true;
    if((agentAddress+1)%10 !== 0 && cells[agentAddress+1] === 'W') return true;
    if((agentAddress-10) >= 0 && cells[agentAddress-10] === 'W') return true;
    if(agentAddress+10 < 100 && cells[agentAddress+10] === 'W') return true;
}

export function checkForPit(agentAddress, cells){
    if(agentAddress%10 !== 0 && cells[agentAddress-1] === 'P') return true;
    if((agentAddress+1)%10 !== 0 && cells[agentAddress+1] === 'P') return true;
    if((agentAddress-10) >= 0 && cells[agentAddress-10] === 'P') return true;
    if(agentAddress+10 < 100 && cells[agentAddress+10] === 'P') return true;
}
export function checkForGold(agentAddress, cells){
    if(agentAddress%10 !== 0 && cells[agentAddress-1] === 'G') return true;
    if((agentAddress+1)%10 !== 0 && cells[agentAddress+1] === 'G') return true;
    if((agentAddress-10) >= 0 && cells[agentAddress-10] === 'G') return true;
    if(agentAddress+10 < 100 && cells[agentAddress+10] === 'G') return true;
}
export function checkRight(agentAddress){
    if((agentAddress+1)%10 !== 0) return true;
    else return false;
}
export function checkLeft(agentAddress){
    if((agentAddress)%10 !== 1) return true;
    else return false;
}
export function checkUp(agentAddress){
    if((agentAddress-10)>= 0) return true;
    else return false;
}
export function checkDown(agentAddress){
    if((agentAddress+10)< 100) return true;
    else return false;
}