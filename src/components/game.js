import React, { useState } from 'react';
import styles from './game.module.css';

const TicTacToe = () => {
	const [turn, setTurn] = useState('x');
	const [cells, setCells] = useState(Array(9).fill(''));
	const [winner, setWinner] = useState();

	const handleWinner = (squares) => {
		let combinations = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagnol: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};

		for (let combo in combinations) {
			combinations[combo].forEach((pattern) => {
				if (
					squares[pattern[0]] === '' ||
					squares[pattern[1]] === '' ||
					squares[pattern[2]] === ''
				) {
					// do nothing
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]]);
				}
			});
		}
	};

	const handleClick = (num) => {
		if (cells[num] !== '') {
			alert('already clicked');
			return;
		}

		let squares = [...cells];

		if (turn === 'x') {
			squares[num] = 'x';
			setTurn('o');
		} else {
			squares[num] = 'o';
			setTurn('x');
		}

		handleWinner(squares);
		setCells(squares);
	};

	const handleRestart = () => {
		setWinner(null);
		setCells(Array(9).fill(''));
	};

	const Box = ({ num }) => {
		return <td onClick={() => handleClick(num)} className={styles.data}>{cells[num]}</td>;
	};

	return (
		<div className={styles.container}>
      <p className={styles.heading}>TicTacToe Game</p>
      <p className={styles.turn}>Turn: {turn}</p>
			<table className={styles.tableContainer}>

				
				<tbody>
					<tr>
						<Box num={0} />
						<Box num={1} />
						<Box num={2} />
					</tr>
					<tr>
						<Box num={3} />
						<Box num={4} />
						<Box num={5} />
					</tr>
					<tr>
						<Box num={6} />
						<Box num={7} />
						<Box num={8} />
					</tr>
				</tbody>
			</table>
			{winner && (
				<>
					<p className={styles.winner}>{winner} is the winner!</p>
					<button onClick={() => handleRestart()} className={styles.restart}>Restart</button>
				</>
			)}
		</div>
	);
};

export default TicTacToe;