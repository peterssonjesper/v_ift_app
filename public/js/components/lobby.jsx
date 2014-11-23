/** @jsx React.DOM */

var React = require('react');
var lobbyStore = require('./../stores/lobby.js');
var lobbyActions = require('./../actions/lobby.js');
var gameStore = require('./../stores/game.js');

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
		return state;
	},

	render: function () {
		var players = this._getPlayerNodes();
		var isReadyButton = this._isReadyButton();
		return (
			<article>
				Löpare:
				<ul>
					{players}
				</ul>
				{isReadyButton}
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
		this.setState({
			isReady: true
		});
		lobbyActions.ready(lobbyStore.getId(), gameStore.getPlayerToken());
	},

	_isReadyButton: function () {
		var className = '';
		if (this.state.isReady) {
			className += 'button--disabled';
		}
		return <button className={className} onClick={this._ready}>Jag är redo!</button>
	},

});
