var eventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var lobbyActions = require('./../actions/lobby.js');
var gameStore = require('./../stores/game.js');
var dispatcher = require('./../singletons/dispatcher.js');

var FETCH_LOBBY_STATUS_INTERVAL = 1000; // ms

var states = {
	IS_JOINING_LOBBY: 'IS_JOINING_LOBBY',
	HAS_JOINED_LOBBY: 'HAS_JOINED_LOBBY',
	HAS_NOT_JOINED_LOBBY: 'HAS_NOT_JOINED_LOBBY'
};

var _lobby = {
	state: states.HAS_NOT_JOINED_LOBBY,
	id: 'lopning-5km',
	name: '',
	players: []
};

var lobbyStore = _.assign({}, eventEmitter.prototype, {

	getState: function () {
		return _lobby.state;
	},

	getName: function () {
		return _lobby.name;
	},

	getId: function () {
		return _lobby.id;
	},

	getPlayers: function () {
		return _lobby.players;
	},

	states: states

});

lobbyStore.dispatchToken = dispatcher.register(function(payload) {
	switch (payload.action) {
		case 'JOINING_LOBBY':
			_lobby.state = states.IS_JOINING_LOBBY;
			lobbyStore.emit('change');
			break;
		case 'JOINED_LOBBY':
			_lobby.state = states.HAS_JOINED_LOBBY;
			_lobby.name = payload.lobbyName;
			lobbyStore.emit('change');
			break;
		case 'FETCHED_LOBBY_STATUS':
			_lobby.players = payload.players;
			lobbyStore.emit('change');
			break;
	}
});

setInterval(function () {
	// TODO: When ready, stop fetching status
	if (lobbyStore.getState() === states.HAS_JOINED_LOBBY) {
		lobbyActions.fetchStatus(lobbyStore.getId(), gameStore.getPlayerToken());
	}
}, FETCH_LOBBY_STATUS_INTERVAL);

module.exports = lobbyStore;
