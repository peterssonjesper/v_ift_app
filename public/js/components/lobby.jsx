/** @jsx React.DOM */

var React = require('react');
var lobbyStore = require('./../stores/lobby.js');

module.exports = React.createClass({

	componentDidMount: function () {
		lobbyStore.addListener('change', this._onChange);
	},

	componentWillUnmount: function () {
		lobbyStore.removeListener('change', this._onChange);
	},

	getInitialState: function () {
		return this._getStateFromStores();
	},

	render: function () {
		var players = this._getPlayerNodes();
		return (
			<article>
				Löpare:
				<ul>
					{players}
				</ul>
			</article>
		);
	},

	_getPlayerNodes: function () {
		return this.state.players.map(function (player, i) {
			return (
				<li key={"player-" + i}>
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
	}

});
