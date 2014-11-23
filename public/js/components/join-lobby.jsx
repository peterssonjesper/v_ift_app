/** @jsx React.DOM */

var React = require('react');
var lobbyActions = require('./../actions/lobby.js');

module.exports = React.createClass({

	getDefaultProps: function () {
		return {
			lobbyName: '',
			lobbyToken: '',
			name: ''
		};
	},

	getInitialState: function () {
		return {
			name: this.props.name
		};
	},

	render: function () {
		return (
			<form onSubmit={this._join} className="lobby__join">
				<input className="lobby__player-name" type="text" value={this.state.name} onChange={this._nameChanged} placeholder="Name" />
				<div className="lobby__action-container">
					<input className="lobby__button" type="submit" value="Kom igång!" />
				</div>
			</form>
		);
	},

	_nameChanged: function (ev) {
		this.setState({
			name: ev.target.value
		});
	},

	_join: function (ev) {
		ev.preventDefault();
		lobbyActions.join(this.props.lobbyId, this.state.name);
	},

	_onChange: function () {
		this.setState(this._getStateFromStores());
	},

	_getStateFromStores: function () {
		return {
			isLoading: lobbyStore.getState() === lobbyStore.states.IS_JOINING_LOBBY
		};
	}

});
