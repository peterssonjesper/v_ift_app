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
				<h2>Participants</h2>
				<ul className="lobby__list">
					{players}
				</ul>
				<div className="lobby__action-container">
					{button}
				</div>
				
			</article>
		);
	},

	_getPlayerNodes: function () {
		return this.state.players.map(function (player, i) {
			var isReady = (
				<span className="lobby__ready-state lobby--not-ready">Not Ready</span>
			);
			if (player.isReady) {
				isReady = (
					<span className="lobby__ready-state lobby--ready">Ready</span>
				);
			}

			return (
				<li className="lobby__list-item" key={"player-" + i}>
					{player.name}
					{isReady}
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
		this.setState({
			isReady: true
		});
		lobbyActions.ready(lobbyStore.getId(), gameStore.getPlayerToken());
	},

	_askForGeoPosition: function () {
		geoActions.askForPermission();
	},

	_getButton: function () {
		
		var className = 'lobby__button';
		if (this.state.isReady) {
			className += ' button--disabled';
		}

		if (geoStore.getStatus() === 'ALLOWED') {
			if (this.state.isReady) {
				return <button className={className}>Waiting for others...</button>
			} else {
				return <button className={className} onClick={this._ready}>I'm ready to run!</button>
			}
		} else if (geoStore.getStatus() === 'NOT_ALLOWED') {
			return <button className={className} onClick={this._askForGeoPosition}>Try again</button>
		} else if (geoStore.getStatus() === 'PENDING') {
			return <button className={className}>Reading position...</button>
		} else {
			return <button className={className} onClick={this._askForGeoPosition}>Get current location</button>
		}
	},

});
