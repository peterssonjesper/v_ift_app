/** @jsx React.DOM */

var React = require('react');
var lobbyActions = require('./../actions/lobby.js');
var lobbyStore = require('./../stores/lobby.js');

module.exports = React.createClass({

	getDefaultProps: function () {
		return {
			name: ''
		};
	},

	getInitialState: function () {
		var state = this._getStateFromStores();
		state.name = this.props.name;
		return state;
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
		lobbyActions.join(this.state.lobbyId, this.state.name);
	},

	_onChange: function () {
		this.setState(this._getStateFromStores());
	},

	_getStateFromStores: function () {
		return {
			lobbyId: lobbyStore.getId()
		};
	}

});
