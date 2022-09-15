import React, { useEffect, useState } from 'react';
import useKeypress from 'react-use-keypress';
import './board.css';
import { checkForWumpus, checkForPit, checkForGold, checkDown, checkUp, checkRight, checkLeft } from './functionalities';
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
		
	const [cells, setCells] = useState(Array(row_count*col_count).fill(''));
    const [agentAddress, setAgentAddress] = useState();
	const [wumpusAddress, setWumpusAddress] = useState(Array(row_count*col_count).fill(-1));
	const [pitAddress, setPitAddress] = useState(Array(row_count*col_count).fill(-1));
	const [goldAddress, setGoldAddress] = useState(Array(row_count*col_count).fill(-1));
	const [cellState, setcellState] = useState(Array(row_count*col_count).fill('unvisited'))
	const [stenches, setStenches] = useState(Array(row_count*col_count).fill(-1))
	const [breezees, setBreezees] = useState(Array(row_count*col_count).fill(-1))
	const [gliters, setGliters] = useState(Array(row_count*col_count).fill(-1))

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
			cellStates[to] = 'visited'
			setAgentAddress(to)
			setcellState(cellStates)
         
			if(checkForWumpus(to, cells)){
				let arr = [...stenches]
				arr[to] = 1
				setStenches(arr)
				cellStates[to] = 'stinky'
				
				if(cellStates[to-1]==="unvisited"){
					console.log(cellStates[to-1])
					setMove( "left")
					console.log(nextmove)
				}
			}
			else if(checkForPit(to, cells)){
				let arr = [...breezees]
				arr[to] = 1
				setBreezees(arr)
				cellStates[to] = 'breezy'
			}
			else if(checkForGold(to, cells)){
				let arr = [...gliters]
				arr[to] = 1
				setGliters(arr)
				cellStates[to] = 'gliter'
			}
			

            

		},1000)
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
                    <div>
                        {
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
                            	<img src={breezestench} alt="breeze_stench" height={70} width={70}/>
								:
								<></>
						}
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