/** @jsx React.DOM */

var React = require('react');
var lobbyStore = require('./../stores/lobby.js');
var lobbyActions = require('./../actions/lobby.js');
var gameStore = require('./../stores/game.js');
var geoActions = require('./../actions/geo.js');
var geoStore = require('./../stores/geo.js');

module.exports = React.createClass({

	componentDidMount: function () {
		lobbyStore.addListener('change', this._onChange);
	},

	componentWillUnmount: function () {
		lobbyStore.removeListener('change', this._onChange);
	},

	getInitialState: function () {
		var state = this._getStateFromStores();
		state.isReady = false;
		state.hasAllowedGeoPosition = false;
		return state;
	},

	render: function () {
		var players = this._getPlayerNodes();
		var button = this._getButton();
		return (
			<article>
				Löpare:
				<ul>
					{players}
				</ul>
				{button}
			</article>
		);
	},

	_getPlayerNodes: function () {
		return this.state.players.map(function (player, i) {
			var isReady = (
				<span>[ ]</span>
			);
			if (player.isReady) {
				isReady = (
					<span>[x]</span>
				);
			}

			return (
				<li key={"player-" + i}>
					{isReady}
					{player.name}
				</li>
			);
		});
	},

	_onChange: function () {
		this.setState(this._getStateFromStores());
	},

	_getStateFromStores: function () {
		return {
			players: lobbyStore.getPlayers()
		};
	},

	_ready: function () {
		lobbyActions.ready(lobbyStore.getId(), gameStore.getPlayerToken());
	},

	_askForGeoPosition: function () {
		geoActions.askForPermission();
	},

	_getButton: function () {
		var className = '';
		if (this.state.isReady) {
			className += 'button--disabled';
		}

		if (geoStore.getStatus() === 'ALLOWED') {
			return <button className={className} onClick={this._ready}>I'm ready to run!</button>
		} else if (geoStore.getStatus() === 'NOT_ALLOWED') {
			return <button className={className} onClick={this._askForGeoPosition}>Try again</button>
		} else if (geoStore.getStatus() === 'PENDING') {
			return <button className={className}>Reading position...</button>
		} else {
			return <button className={className} onClick={this._askForGeoPosition}>Get current location</button>
		}
	},

});
