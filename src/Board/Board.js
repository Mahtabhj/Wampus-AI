import React, { useEffect, useState } from 'react';
import useKeypress from 'react-use-keypress';
import './board.css';
import { checkForWumpus, checkForPit, checkForGold, checkDown, checkUp, checkRight, checkLeft, calculateRisk } from './functionalities';
import agent from '../images/agent.png';
import wumpus from '../images/wumpus.png';
import gold from '../images/gold.png'
import pit from '../images/pit.png'
import stench from '../images/stench.png'
import breeze from '../images/breeze.png'
import breezestench from '../images/breeze_stench.png'
import gliter from '../images/gliter.png'

/*
    Cell classes:
    =============
    - unvisited (blurred)
    - safe
    - stench
    - breeze
    - agentsafe
    - agentstinky
    - agentbreeze
    - wumpus (blurred)
    - pit (blurred)
    - gold (blurred)
    - agentwumpus
    - agentpit
    - agentgold
*/

const Board = () => {
	const [title, setTitle] = useState();
		const row_count = 10;
		const col_count = 10;
let input = Array(row_count*col_count)
		let gameStarted = false;
		input = [
			'A','S','S','S','S','W','S','S','W','S',
			'S','S','S','S','S','S','S','S','S','S',
			'S','S','W','S','S','G','S','S','P','S',
			'W','S','S','S','S','S','S','W','S','S',
			'S','S','S','S','G','S','S','S','W','S',
			'P','S','P','S','S','S','P','S','S','S',
			'S','S','S','S','S','S','S','S','S','P',
			'W','S','S','W','S','S','S','P','S','S',
			'S','S','S','S','S','P','S','S','W','S',
			'S','P','S','S','P','S','W','S','S','S'
		];
			
		if(title===1){
console.log(title)
		}
		else if (title==="2"){
			console.log(title)
			input = [
				'A','S','S','S','S','S','S','S','S','S',
				'S','S','S','S','S','S','S','S','S','S',
				'S','S','W','S','S','G','S','S','S','S',
				'S','S','S','S','S','S','S','S','S','S',
				'S','S','S','S','G','S','S','S','S','S',
				'S','S','S','S','S','S','P','S','S','S',
				'S','S','S','S','S','S','S','S','S','S',
				'S','S','S','S','S','S','S','S','S','S',
				'S','S','S','S','S','S','S','S','S','S',
				'S','S','S','S','S','S','S','S','S','S'
			];
		}
		else if (title==="3"){
			console.log(title)
			input = [
				'A','S','S','S','S','W','S','S','W','S',
				'S','S','S','S','S','S','S','S','S','S',
				'S','S','W','S','S','G','S','S','P','S',
				'S','S','S','S','S','S','S','S','S','S',
				'S','S','S','S','G','S','S','S','W','S',
				'S','S','P','S','S','S','P','S','S','S',
				'S','S','S','S','S','S','S','S','S','S',
				'W','S','S','W','S','S','S','P','S','S',
				'S','S','S','S','S','P','S','S','W','S',
				'S','P','S','S','S','S','S','S','S','S'
			];
		}
		
	const [cells, setCells] = useState(Array(row_count*col_count).fill(''));
    const [agentAddress, setAgentAddress] = useState();
	const [wumpusAddress, setWumpusAddress] = useState(Array(row_count*col_count).fill(-1));
	const [pitAddress, setPitAddress] = useState(Array(row_count*col_count).fill(-1));
	const [goldAddress, setGoldAddress] = useState(Array(row_count*col_count).fill(-1));
	const [cellState, setcellState] = useState(Array(row_count*col_count).fill('unvisited'))
	const [stenches, setStenches] = useState(Array(row_count*col_count).fill(-1))
	const [breezees, setBreezees] = useState(Array(row_count*col_count).fill(-1))
	const [gliters, setGliters] = useState(Array(row_count*col_count).fill(-1))
    const [previous, setPrevious] = useState(Array(row_count*col_count).fill(-1))
	const [nextmove,setMove] = useState("Right");
	
	const startGame = () => {
		
		initiateBoard()
		//console.log(cells);
		gameStarted = true;
	}
	//startGame()
	
	const initiateBoard = () => {
		// console.log(title);
		for (let i = 0; i < cells.length; i++) {
			if(cells[i] === 'A'){
				setAgentAddress(i);
				let cellStates = [...cellState]
				cellStates[i] = 'visited'
				setcellState(cellStates)
			}
			else if(cells[i] === 'W'){
				let arr = [...wumpusAddress]
				arr[i] = 1;
				setWumpusAddress(arr)
				//console.log(wumpusAddress)
			}
			else if(cells[i] === 'G'){
				let arr = [...goldAddress]
				arr[i] = 1;
				setGoldAddress(arr)
			}
			else if(cells[i] === 'P'){
				let arr = [...pitAddress]
				arr[i] = 1;
				setPitAddress(arr)
			}
		}
	}
	
	const agentvisits = (to) => {
		setTimeout(()=>{
			console.log("saas")
			let cellStates = [...cellState]
			let previou = [...previous]
			cellStates[to] = 'visited'
			 previou[to] = agentAddress;
			setAgentAddress(to)
			setcellState(cellStates)
			
			
         if(checkForPit(to, cells)&&checkForWumpus(to,cells)){
				let arr = [...gliters]
				arr[to] = 1
				setGliters(arr)
				cellStates[to] = 'stinky_breezy'
			}
			else if(checkForWumpus(to, cells)){
				let arr = [...stenches]
				arr[to] = 1
				setStenches(arr)
				cellStates[to] = 'stinky'
		
				if(cellStates[to-1]==="unvisited"){
					
					setMove( "left")
					
				}
			}
			else if(checkForPit(to, cells)){
				let arr = [...breezees]
				arr[to] = 1
				setBreezees(arr)
				cellStates[to] = 'breezy'
			}
			var min =0;
			var up = 0,right =0 ,left =0, down=0;
			if(calculateRisk((to-10),cellStates)===undefined)
			{
			min = Math.min(calculateRisk((to+1),cellStates),calculateRisk((to-1),cellStates),calculateRisk((to+10),cellStates));
			}
			else 
			{
			min = Math.min(calculateRisk((to-10),cellStates),calculateRisk((to+1),cellStates),calculateRisk((to-1),cellStates),calculateRisk((to+10),cellStates));
			}
            up = calculateRisk((to-10),cellStates)
			down = calculateRisk((to+10),cellStates)
			right = calculateRisk((to+1),cellStates)
			left = calculateRisk((to-1),cellStates)
             var arr=[0,0,0,0];


			console.log(calculateRisk((to+1),cellStates))
			console.log(calculateRisk((to-1),cellStates))
			console.log(calculateRisk((to+10),cellStates))
			console.log(calculateRisk((to-10),cellStates))
		
			console.log("Min = "+min)
			console.log(previou[to])
			console.log(to)
			
			if(min === calculateRisk((to+1),cellStates))
			{
				setMove("Right")
				arr[0]=1;
			}
			else if(min === calculateRisk((to-1),cellStates))
			{
				setMove("Left")
				arr[1]=1;
			}
			else if(min === calculateRisk((to+10),cellStates))
			{
				setMove("Down")
				arr[2]=1;
			}
			else if(min === calculateRisk((to-10),cellStates))
			{
				setMove("Up")
				arr[3]=1;
			 }
			// up = calculateRisk((to-10),cellStates)
			// down = calculateRisk((to+10),cellStates)
			// right = calculateRisk((to+1),cellStates)
			// left = calculateRisk((to-1),cellStates)
            //  var arr=[0,0,0,0];
            // var flag =0 ;

			// console.log(calculateRisk((to+1),cellStates))
			// console.log(calculateRisk((to-1),cellStates))
			// console.log(calculateRisk((to+10),cellStates))
			// console.log(calculateRisk((to-10),cellStates))
		
			// console.log("Min = "+min)
			// console.log(previou[to])
			// console.log(to)
			
			// if(min === calculateRisk((to+1),cellStates))
			// {
			// 	setMove("Right")
			// 	arr[0]=1;
			// 	flag = flag +1;
			// }
			// if(min === calculateRisk((to-1),cellStates))
			// {
			// 	setMove("Left")
			// 	arr[1]=1;
			// 	flag = flag +1;
			// }
			// if(min === calculateRisk((to+10),cellStates))
			// {
			// 	setMove("Down")
			// 	arr[2]=1;
			// 	flag = flag +1;
			// }
			// if(min === calculateRisk((to-10),cellStates))
			// {
			// 	setMove("Up")
			// 	arr[3]=1;
			// 	flag = flag +1;
			// }
            
            //  if(flag>1){
			// 	const num  = Math.floor(Math.random() * flag);
			// 	if(num===0&&arr[0]===1){
			// 		setMove("Right")
			// 	}
			// 	if(num===1&&arr[1]===1){
			// 		setMove("Left")
			// 	}
			// 	if(num===2&&arr[2]===1){
			// 		setMove("Down")
			// 	}
			// 	if(num===3&&arr[3]===1){
			// 		setMove("UP")
			// 	}
			//  }


		},1000)
	}

	const shootUp = () => {
		let arr = [...stenches]
		// arr[] = 0
		setStenches(arr)
		cells[agentAddress - 10] = 'S';
	
		if(cellState[agentAddress - 11]=== "stinky"){
			cellState[agentAddress - 11]= "visited";
			arr [agentAddress - 11]=0;
		}
		if(cellState[agentAddress - 9]=== "stinky"){
			cellState[agentAddress - 9]= "visited";
			arr [agentAddress - 9]=0;
		}
		if(cellState[agentAddress]=== "stinky"){
			cellState[agentAddress]= "visited";
			arr [agentAddress]=0;
		}
		if(cellState[agentAddress-20]=== "stinky"){
			cellState[agentAddress-20]= "visited";
			arr [agentAddress - 20]=0;
		}
		if(cellState[agentAddress - 11]=== "stinky_breezy"){
			cellState[agentAddress - 11]= "breezy";
			arr [agentAddress - 11]=0;
		}
		if(cellState[agentAddress - 9]=== "stinky_breezy"){
			cellState[agentAddress - 9]= "breezy";
			arr [agentAddress - 9]=0;
		}
		if(cellState[agentAddress]=== "stinky_breezy"){
			cellState[agentAddress]= "breezy";
			arr [agentAddress]=0;
		}
		if(cellState[agentAddress-20]=== "stinky_breezy"){
			cellState[agentAddress-20]= "breezy";
			arr [agentAddress - 20]=0;
		}
		
	}

	const shootRight = () => {
		let arr = [...stenches]
		// arr[] = 0
		setStenches(arr)
		cells[agentAddress+1] = 'S';
	
		if(cellState[agentAddress+2]=== "stinky"){
			cellState[agentAddress+2]= "visited";
			arr [agentAddress+2]=0;
		}
		if(cellState[agentAddress-9]=== "stinky"){
			cellState[agentAddress - 9]= "visited";
			arr [agentAddress - 9]=0;
		}
		if(cellState[agentAddress+11]=== "stinky"){
			cellState[agentAddress+11]= "visited";
			arr [agentAddress+11]=0;
		}
		if(cellState[agentAddress]=== "stinky"){
			cellState[agentAddress]= "visited";
			arr [agentAddress]=0;
		}
		if(cellState[agentAddress - 9]=== "stinky_breezy"){
			cellState[agentAddress - 9]= "breezy";
			arr [agentAddress - 9]=0;
		}
		if(cellState[agentAddress +11]=== "stinky_breezy"){
			cellState[agentAddress +11]= "breezy";
			arr [agentAddress +11]=0;
		}
		if(cellState[agentAddress]=== "stinky_breezy"){
			cellState[agentAddress]= "breezy";
			arr [agentAddress]=0;
		}
		if(cellState[agentAddress+2]=== "stinky_breezy"){
			cellState[agentAddress+2]= "breezy";
			arr [agentAddress +2]=0;
		}
		
	}
	
	const shootLeft = () => {
		let arr = [...stenches]
		// arr[] = 0
		setStenches(arr)
		cells[agentAddress -1] = 'S';
		
		if(cellState[agentAddress - 11]=== "stinky"){
			cellState[agentAddress - 11]= "visited";
			arr [agentAddress - 11]=0;
		}
		if(cellState[agentAddress - 2]=== "stinky"){
			cellState[agentAddress - 2]= "visited";
			arr [agentAddress - 2]=0;
		}
		if(cellState[agentAddress]=== "stinky"){
			cellState[agentAddress]= "visited";
			arr [agentAddress]=0;
		}
		if(cellState[agentAddress+9]=== "stinky"){
			cellState[agentAddress+9]= "visited";
			arr [agentAddress +9]=0;
		}
		if(cellState[agentAddress - 11]=== "stinky_breezy"){
			cellState[agentAddress - 11]= "breezy";
			arr [agentAddress - 11]=0;
		}
		if(cellState[agentAddress + 9]=== "stinky_breezy"){
			cellState[agentAddress + 9]= "breezy";
			arr [agentAddress + 9]=0;
		}
		if(cellState[agentAddress]=== "stinky_breezy"){
			cellState[agentAddress]= "breezy";
			arr [agentAddress]=0;
		}
		if(cellState[agentAddress-2]=== "stinky_breezy"){
			cellState[agentAddress-2]= "breezy";
			arr [agentAddress - 2]=0;
		}
		
	}
	
	const shootDown = () => {
		let arr = [...stenches]
		// arr[] = 0
		setStenches(arr)
		cells[agentAddress + 10] = 'S';
		
		if(cellState[agentAddress + 11]=== "stinky"){
			cellState[agentAddress + 11]= "visited";
			arr [agentAddress + 11]=0;
		}
		if(cellState[agentAddress + 9]=== "stinky"){
			cellState[agentAddress +9]= "visited";
			arr [agentAddress + 9]=0;
		}
		if(cellState[agentAddress]=== "stinky"){
			cellState[agentAddress]= "visited";
			arr [agentAddress]=0;
		}
		if(cellState[agentAddress+20]=== "stinky"){
			cellState[agentAddress+20]= "visited";
			arr [agentAddress + 20]=0;
		}
		if(cellState[agentAddress + 11]=== "stinky_breezy"){
			cellState[agentAddress + 11]= "breezy";
			arr [agentAddress + 11]=0;
		}
		if(cellState[agentAddress + 9]=== "stinky_breezy"){
			cellState[agentAddress + 9]= "breezy";
			arr [agentAddress + 9]=0;
		}
		if(cellState[agentAddress]=== "stinky_breezy"){
			cellState[agentAddress]= "breezy";
			arr [agentAddress]=0;
		}
		if(cellState[agentAddress+20]=== "stinky_breezy"){
			cellState[agentAddress+20]= "breezy";
			arr [agentAddress + 20]=0;
		}
		
	}
	const makeMove = (to,depth) => {
		console.log("edpth", depth);
		if(depth === 3 || checkForWumpus(agentAddress,cells) || checkForPit(agentAddress,cells))
			{setAgentAddress(to); return;}
		else{
			if((agentAddress+1)%10 !== 0){
				setTimeout(()=>{
					setTimeout(()=>{agentvisits(agentAddress+1)},1000)
					setTimeout(()=>{makeMove(to+1,depth+1)},1000)
					setTimeout(()=>{setAgentAddress(to)},1000)
				},1000)
			}
			if(agentAddress%10 !== 0){
				setTimeout(()=>{
					setTimeout(()=>{agentvisits(agentAddress-1)},1000)
					setTimeout(()=>{makeMove(to-1, depth+1)},1000)
					setTimeout(()=>{setAgentAddress(to)},1000)
				},1000)
			}
			if((agentAddress-10) >= 0){ 
				setTimeout(()=>{
					setTimeout(()=>{agentvisits(agentAddress-10)},1000)
					setTimeout(()=>{makeMove(to-10,depth+1)},1000)
					setTimeout(()=>{setAgentAddress(to)},1000)
				},1000)
			}
			if(agentAddress+10 < 100){
				setTimeout(()=>{
					setTimeout(()=>{agentvisits(agentAddress+10)},1000)
					setTimeout(()=>{makeMove(to+10,depth+1)},1000)
					setTimeout(()=>{setAgentAddress(to)},1000)
				},2000)
			}
		}
		setAgentAddress(to)
	}
  const aimove = ()=>{
	if(checkForWumpus(agentAddress,cells)||checkForPit(agentAddress,cells)){
     
	}
  }
	const Cell = ({ num }) => {
		return <td className={cellState[num]}>
                    <div>{
							num == agentAddress && breezees[num] != 1 && stenches[num] != 1 &&gliters[num]!=1?
                            	<img src={agent} alt="agent" height={70} width={70}/>
								:
								<></>
						}
					{
							num ==agentAddress && cells[num] === 'W'?
                            	<img src={wumpus} alt="wumpus" height={70} width={70}/>
								:
								<></>
						}
						{
							num ==agentAddress &&cells[num] === 'G'?
                            	<img src={gold} alt="gold" height={70} width={70}/>
								:
								<></>
						}
						{
							num ==agentAddress &&cells[num] === 'P'?
                            	<img src={pit} alt="pit" height={70} width={70}/>
								:
								<></>
						}
						
                        {/* {
							num == agentAddress && breezees[num] != 1 && stenches[num] != 1 &&gliters[num]!=1?
                            	<img src={agent} alt="agent" height={70} width={70}/>
								:
								<></>
						}
						{
							cells[num] === 'W'?
                            	<img src={wumpus} alt="wumpus" height={70} width={70}/>
								:
								<></>
						}
						{
							cells[num] === 'G'?
                            	<img src={gold} alt="gold" height={70} width={70}/>
								:
								<></>
						}
						{
							cells[num] === 'P'?
                            	<img src={pit} alt="pit" height={70} width={70}/>
								:
								<></>
						}
						{
							stenches[num] === 1 && agentAddress === num?
                            	<img src={stench} alt="stench" height={70} width={70}/>
								:
								<></>
						}
						{
							breezees[num] === 1 && agentAddress === num?
                            	<img src={breeze} alt="breeze" height={70} width={70}/>
								:
								<></>
						}
						{
							gliters[num] === 1 && agentAddress === num?
                            	<img src={gliter} alt="breeze" height={70} width={70}/>
								:
								<></>
						}
						{
							breezees[num] === 1 && stenches[num] === 1 && agentAddress === num?
                            	<img src={gliter} alt="breeze_stench" height={70} width={70}/>
								:
								<></>
						} */}
                    </div>
            </td>;
	};

	useKeypress(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown','Enter'], (event) => {
		if (event.key === 'ArrowLeft') {
			if(agentAddress%10 !== 0) agentvisits(agentAddress - 1)
		}
		if (event.key === 'ArrowRight') {
			if((agentAddress+1)%10 !== 0) agentvisits(agentAddress + 1)
		}
		if (event.key === 'ArrowUp') {
			if(agentAddress-10 >= 0) agentvisits(agentAddress - 10)
		}
		if (event.key === 'ArrowDown') {
			if(agentAddress+10 < 100) agentvisits(agentAddress + 10)
		}
		if(event.key === 'Enter') { let a = agentAddress; makeMove(agentAddress,0);agentvisits(a);console.log(agentAddress);}
	});

	useEffect(() => {
		setCells(input)
		// setTimeout(() => {
		// 	makeMove(agentAddress)
		// },2000)
	},[])

    var t = 0;

	return (
		<div className='container mt-5' id='main'>
			<button onClick={startGame}>Start Game</button>
		
			<button type="button" class="btn btn-primary" onClick={shootUp}>Shoot Up</button>
			<button type="button" class="btn btn-primary" onClick={shootRight}>Shoot Right </button>
			<button type="button" class="btn btn-primary" onClick={shootDown}>Shoot Down </button>
			<button type="button" class="btn btn-primary" onClick={shootLeft}>Shoot Left </button>
			<h1>{nextmove}</h1>
			<select 
   type="text"
   placeholder="Title"
   className="writeInput"
   autoFocus={true}
   onChange={e=>setTitle(e.target.value)}
  class="form-select" aria-label=".form-select-lg example">
  <option >Select Wampus World</option>
  <option value="1">Wampus 1</option>
  <option value="2">Wampus 2</option>
  <option value="3">Wampus 3</option>
</select>
			<table className="box">
				<tbody>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Board;