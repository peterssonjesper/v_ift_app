/** @jsx React.DOM */

var React = require('react');
var lobbyStore = require('./../stores/lobby.js');
var gameStore = require('./../stores/game.js');

module.exports = React.createClass({

	componentDidMount: function () {
		lobbyStore.addListener('change', this._onChange);
		gameStore.addListener('change', this._onChange);
	},

	componentWillUnmount: function () {
		lobbyStore.removeListener('change', this._onChange);
		gameStore.removeListener('change', this._onChange);
	},

	getInitialState: function () {
		return this._getStateFromStores();
	},

	render: function () {
		var players = this._getPlayerNodes();
		return (
			<article>
				<ul>
					{players}
				</ul>
			</article>
		);
	},

	_onChange: function () {
		this.setState(this._getStateFromStores());
	},

	_getStateFromStores: function () {
		return {
			players: lobbyStore.getPlayers(),
			maxDistance: gameStore.getMaxDistance()
		};
	},

	_getPlayerNodes: function () {
		return this.state.players.map(function (player, i) {
			var style = {
				width: (player.distance / this.state.maxDistance) + '%'
			};
			return (
				<li key={"player-" + i} className="player">
					<p className="player__name">{player.name}</p>
					<div className="player__progress" style={style}></div>
				</li>
			);
		}.bind(this));
	}

});
