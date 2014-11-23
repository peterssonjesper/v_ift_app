/** @jsx React.DOM */

var React = require('react');
var gameStore = require('./../stores/game.js');
var JoinLobby = require('./../components/join-lobby.jsx');
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
		if (this.state.gameState === gameStore.states.JOINING_LOBBY) {
			currentView = <JoinLobby lobbyName="Kvällslöpning 5km" lobbyToken="217839123" />;
		} else if (this.state.gameState === gameStore.states.WAITING_FOR_READY_SIGNAL ||
		  this.state.gameState === gameStore.states.WAITING_FOR_OTHERS) {
			currentView = <Lobby />
		}
		return currentView;
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
