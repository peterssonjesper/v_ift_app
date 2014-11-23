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
			<form onSubmit={this._join}>
				<h1>Gå med i {this.props.lobbyName}</h1>
				<input type="text" value={this.state.name} onChange={this._nameChanged} />
				<input type="submit" value="Gå med" />
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
		lobbyActions.join(this.props.lobbyToken, this.state.name);
	}

});
