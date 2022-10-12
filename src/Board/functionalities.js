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
export function calculateRisk(address,cellStates){
  var risk=0;
  var flag= 0;
  if(cellStates[address]==="visited")
  {
     risk = risk + 5;
   
     return risk;
  }
  else if(cellStates[address]==="stinky")
  {
    risk = risk + 10; return risk;
  }
  else if(cellStates[address]==="breezy")
  {
    risk = risk + 10; return risk;
  }
  else if(cellStates[address]==="stinky_breezy")
  {
    risk = risk + 20; return risk;
  }
  else if(cellStates[address]==="unvisited")
  {
    if((address+1)%10 !== 0 &&cellStates[address+1]==="stinky")
    {
          risk = risk +25;
          flag = 1;
          
    }
    if((address-1)%10 !== 9&&cellStates[address-1]==="stinky")
    {
          risk = risk +25; 
          flag = 1;
         
    }
    if(cellStates[address+10]==="stinky")
    {
          risk = risk +25;
          flag = 1;
    }
    if(cellStates[address-10]==="stinky")
    {
          risk = risk +25;
          flag = 1;
    }
    if((address+1)%10 !== 0 &&cellStates[address+1]==="breezy")
    {
          risk = risk +25;
          if(flag===1)
          {
            risk = 0;
          }
    }
    if((address-1)%10 !== 9&&cellStates[address-1]==="breezy")
    {
          risk = risk +25;
          if(flag===1)
          {
            risk = 0;
          }
    }
    if(cellStates[address+10]==="breezy")
    {
          risk = risk +25;
          if(flag===1)
          {
            risk = 0;
          }
    }
    if(cellStates[address-10]==="breezy")
    {
          risk = risk +25;
          if(flag===1)
          {
            risk = 0;
          }
    }
    return risk;
  }
  
}

export function calculateRiskTest(present,address,cellStates){
  var risk=0;
  var flag= 0;
  if(cellStates[address]==="visited")
  {
     risk = risk + 5;
   
     return risk;
  }
  else if(cellStates[address]==="stinky")
  {
    risk = risk + 10; return risk;
  }
  else if(cellStates[address]==="breezy")
  {
    risk = risk + 10; return risk;
  }
  else if(cellStates[address]==="stinky_breezy")
  {
    risk = risk + 20; return risk;
  }
  else if(cellStates[address]==="unvisited")
  {
    if((address+1)%10 !== 0 &&cellStates[address+1]==="stinky")
    {
          risk = risk +25;
          flag = 1;
          
    }
    if((address-1)%10 !== 9&&cellStates[address-1]==="stinky")
    {
          risk = risk +25; 
          flag = 1;
         
    }
    if(cellStates[address+10]==="stinky")
    {
          risk = risk +25;
          flag = 1;
    }
    if(cellStates[address-10]==="stinky")
    {
          risk = risk +25;
          flag = 1;
    }
    if((address+1)%10 !== 0 &&cellStates[address+1]==="breezy")
    {
          risk = risk +25;
          if(flag===1)
          {
            risk = 0;
          }
    }
    if((address-1)%10 !== 9&&cellStates[address-1]==="breezy")
    {
          risk = risk +25;
          if(flag===1)
          {
            risk = 0;
          }
    }
    if(cellStates[address+10]==="breezy")
    {
          risk = risk +25;
          if(flag===1)
          {
            risk = 0;
          }
    }
    if(cellStates[address-10]==="breezy")
    {
          risk = risk +25;
          if(flag===1)
          {
            risk = 0;
          }
    }
    if((address+1)%10 !== 0 &&cellStates[address+1]==="stinky_breezy")
    {
          risk = risk +25;
          
    }
    if((address-1)%10 !== 9&&cellStates[address-1]==="stinky_breezy")
    {
          risk = risk +25;
          
    }
    if(cellStates[address+10]==="stinky_breezy")
    {
          risk = risk +25;
          
    }
    if(cellStates[address-10]==="stinky_breezy")
    {
          risk = risk +25;
          
    }
    if(cellStates[present]==="visited" && risk ===25)
    {
      risk = 0;
    }
    if(cellStates[present]==="visited" && risk ===50)
    {
      risk = 0;
    }
    if(cellStates[present]==="visited" && risk ===75)
    {
      risk = 0;
    }
    return risk;
  }
  
}
