/** @jsx React.DOM */

var React = require('react');
var gameStore = require('./../stores/game.js');
var JoinLobby = require('./../components/join-lobby.jsx');

module.exports = React.createClass({

	componentDidMount: function () {
		gameStore.addListener('change', this._onChange);
	},

	getInitialState: function () {
		return this._getStateFromStores();
	},

	render: function () {
		var currentView = null;
		if (this.state.gameState === gameStore.states.JOINING_LOBBY) {
			currentView = <JoinLobby lobbyName="Kvällslöpning 5km" lobbyToken="217839123" />;
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
