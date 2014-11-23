/** @jsx React.DOM */

var JoinLobby = require('./components/join-lobby.jsx');
var React = require('react');

React.render(
	<JoinLobby lobbyName="Kvällslöpning 5km" lobbyToken="217839123" />,
	document.getElementById('app')
);
