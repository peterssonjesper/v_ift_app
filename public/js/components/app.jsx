/** @jsx React.DOM */

var React = require('react');
var gameStore = require('./../stores/game.js');
var Header = require('./../components/header.jsx');
var JoinLobby = require('./../components/join-lobby.jsx');
var Workout = require('./../components/workout.jsx');
var Lobby = require('./../components/lobby.jsx');

module.exports = React.createClass({

	componentDidMount: function () {
		gameStore.addListener('change', this._onChange);
	},

	componentWillUnmount: function () {
		gameStore.removeListener('change', this._onChange);
	},

	getInitialState: function () {
		return this._getStateFromStores();
	},

	render: function () {
		var currentView = null;
		var className = 'page';

		if (this.state.gameState === gameStore.states.JOINING_LOBBY) {
			currentView = <JoinLobby lobbyName="Kvällslöpning 5km" lobbyId="v_iftlobby0" />;
		} else if (this.state.gameState === gameStore.states.WAITING_FOR_READY_SIGNAL ||
		  this.state.gameState === gameStore.states.WAITING_FOR_OTHERS) {
			currentView = <Lobby />;
			className += ' page--full';
		} else if (this.state.gameState === gameStore.states.ONGOING ||
		   this.state.gameState === gameStore.states.FINISHED) {
			currentView = <Workout />;
			className += ' page--full';
		}

		return (
			<section className={className}>
				<Header title={this._getHeader()} />
				{currentView}
			</section>
		);
	},

	_onChange: function () {
		this.setState(this._getStateFromStores());
	},

	_getStateFromStores: function () {
		return {
			gameState: gameStore.getState()
		};
	},

	_getHeader: function () {
		if (this.state.gameState === gameStore.states.JOINING_LOBBY) {
			return "V_ift";
		}

		if (this.state.gameState === gameStore.states.WAITING_FOR_READY_SIGNAL ||
		  this.state.gameState === gameStore.states.WAITING_FOR_OTHERS) {
			return "Lobby";
			
		}

		if (this.state.gameState === gameStore.states.ONGOING) {
			return "Workout";
		}

		if (this.state.gameState === gameStore.states.FINISHED) {
			if (lobbyStore.didWin()) {
				return "You won!";
			} else {
				return "You lost :(";
			}
		}
	}

});
