var eventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var lobbyActions = require('./../actions/lobby.js');
var gameStore = require('./../stores/game.js');
var dispatcher = require('./../singletons/dispatcher.js');

var FETCH_LOBBY_STATUS_INTERVAL = 1000; // ms

var _lobby = {
	id: 'lopning-5km',
	name: '',
	players: []
};

var lobbyStore = _.assign({}, eventEmitter.prototype, {

	getName: function () {
		return _lobby.name;
	},

	getId: function () {
		return _lobby.id;
	},

	getPlayers: function () {
		return _lobby.players;
	},

	didWin: function () {
		return true;
	}

});

lobbyStore.dispatchToken = dispatcher.register(function(payload) {
	switch (payload.action) {
		case 'JOINING_LOBBY':
			lobbyStore.emit('change');
			break;
		case 'JOINED_LOBBY':
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
	if (gameStore.getState() === gameStore.states.WAITING_FOR_READY_SIGNAL ||
	  gameStore.getState() === gameStore.states.WAITING_FOR_OTHERS) {
		lobbyActions.fetchStatus(lobbyStore.getId(), gameStore.getPlayerToken());
	}
}, FETCH_LOBBY_STATUS_INTERVAL);

module.exports = lobbyStore;
