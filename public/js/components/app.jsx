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
		var header = "";
		
		if (this.state.gameState === gameStore.states.JOINING_LOBBY) {
			currentView = <JoinLobby lobbyName="Kvällslöpning 5km" lobbyToken="217839123" />;
			header = "Join Lobby";
			
		} else if (this.state.gameState === gameStore.states.WAITING_FOR_READY_SIGNAL ||
		  this.state.gameState === gameStore.states.WAITING_FOR_OTHERS) {
			currentView = <Lobby />;
			header = "Lobby";
			
		} else if (this.state.gameState === gameStore.states.ONGOING) {
			currentView = <Workout />;
			header = "Workout";
		}
		
		return (
			<section>
				<Header title={header} />
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
	}

});
