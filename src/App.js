import React from 'react';
import Grid from './components/Grid';
import doge from './assets/Doge.png';
import evilDoge from './assets/Evil_doge.png';


export default class App extends React.Component {
	constructor(props) {
		super(props);
		var initial_state = 
		{
			board: [ [ 0, 0, 0], [ 0, 0, 0], [ 0, 0, 0] ],
			cases: {
				0: null,
				1: doge,
				2: evilDoge
			},
			players: {1: {name: "Doge", wins: 0},
					  2: {name: "Evil doge", wins: 0}},
			playingPlayer: 1,
			winner: false
		};
		this.state = initial_state;
		this.reset = this.reset.bind(this);
		this.clicking = false;
		this.tokens = 0;
	}

	handleClick = (row, col) => {
		if (this.clicking) {
			return;
		}

		if (this.state.winner == false){
			let board = [ ...this.state.board ];
			let values = Object.keys(this.state.cases);
			if (board[row][col] == 0){
				board[row][col] = parseInt(values[this.state.playingPlayer]);
				this.clicking = true;
				this.setState({ board }, () => { 
					this.clicking = false;
				});
				this.tokens += 1;
				this.winnerExists();
				this.game();
			}
		}
	};

	render() {
		return(
			<div className="another">

				<div className="PlayerBoard">
					{this.state.players[1].name}
					<div className="Status">
						{this.state.players[1].wins} WINS
					</div>
				</div>

				
					
				<div className="Wrapper">
					<div className="ResetContainer">
						<input type="button" value="RESET BOARD" onClick={this.reset}></input>
					</div>
					<Grid handleClick={this.handleClick} cases={this.state.cases} board={this.state.board} /> 
					<h1>{this.showWinner()}</h1>
				</div>
				

				<div className="PlayerBoard">
					{this.state.players[2].name}
					<div className="Status">
						{this.state.players[2].wins} WINS
					</div>
				</div>
			</div>
		)
	}

	winnerExists(){
		if(this.state.board[0][0]==this.state.board[1][1] && this.state.board[1][1]==this.state.board[2][2] && this.state.board[2][2]!=0) {
			this.winner()
		}

		if(this.state.board[0][2]==this.state.board[1][1] && this.state.board[1][1]==this.state.board[2][0] && this.state.board[2][0]!=0) {
			this.winner()
		}

		[0, 1, 2].map( (i) => { 
			if(this.state.board[0][i]==this.state.board[1][i] && this.state.board[1][i]==this.state.board[2][i] && this.state.board[2][i]!=0) {
				this.winner()
			} 
		})
		
		this.state.board.map( (row) => { 
			if(row[0]==row[1] && row[1]==row[2] && row[2]!=0) {
				this.winner()
			} 
		})
	}

	winner(){
		this.setState({winner: true});
		let p = this.state.players;
		p[this.state.playingPlayer].wins += 1
		this.setState({players: p});
	}

	game(){
		if(this.state.playingPlayer == 1){
			this.setState({playingPlayer: 2})
		}
		else{
			this.setState({playingPlayer: 1})
		}
	}

	showWinner(){
		if (this.state.winner){
			return(
			this.state.players[this.state.playingPlayer].name + " loses"
			)
		}
		else{
			if (this.tokens >= 9 && this.state.winner == false){
				return(
				"DRAW"
				)
			}
		}
	}

	reset(){
		this.setState({
			board: [ [ 0, 0, 0,], [ 0, 0, 0], [ 0, 0, 0] ],
			winner: false,

		})
		this.tokens = 0;
	}
}

