/** @jsx React.DOM */

var React = require('react');
var lobbyActions = require('./../actions/lobby.js');
var lobbyStore = require('./../stores/lobby.js');

module.exports = React.createClass({

	componentDidMount: function () {
		lobbyStore.addListener('change', this._onChange);
	},

	componentWillUnmount: function () {
		lobbyStore.removeListener('change', this._onChange);
	},

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
		var loading = this._getSpinner();
		return (
			<form onSubmit={this._join}>
				<h1>{this.props.lobbyName}</h1>
				<input type="text" value={this.state.name} onChange={this._nameChanged} placeholder="Namn" />
				{loading}
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
	},

	_getSpinner: function () {
		if (this.state.isLoading) {
			return <div>Går med...</div>;
		}
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
