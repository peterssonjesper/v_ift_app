var eventEmitter = require('events').EventEmitter;
var dispatcher = require('./../singletons/dispatcher.js');
var lobbyApi = require('./../api/lobby.js');
var _ = require('lodash');

var states = {
	WAITING_FOR_READY_SIGNAL: 'WAITING_FOR_READY_SIGNAL',
	WAITING_FOR_OTHERS: 'WAITING_FOR_OTHERS',
	JOINING_LOBBY: 'JOINING_LOBBY',
	ONGOING: 'ONGOING'
};

var _game = {
	state: states.JOINING_LOBBY,
	playerToken: '',
	maxDistance: 0
};

var gameStore = _.assign({}, eventEmitter.prototype, {

	getState: function () {
		return _game.state;
	},

	getPlayerToken: function () {
		return _game.playerToken
	},

	getMaxDistance: function () {
		return _game.maxDistance;
	},

	states: states

});

gameStore.dispatchToken = dispatcher.register(function(payload) {
	switch (payload.action) {
		case 'JOINED_LOBBY':
			_game.state = states.WAITING_FOR_READY_SIGNAL;
			_game.playerToken = payload.playerToken;
			gameStore.emit('change');
			break;
		case 'PLAYER_IS_READY':
			_game.state = states.WAITING_FOR_OTHERS;
			gameStore.emit('change');
			break;
		case 'FETCHED_LOBBY_STATUS':
			if (payload.status === lobbyApi.states.ONGOING) {
				_game.maxDistance = payload.maxDistance;
				_game.state = states.ONGOING;
				gameStore.emit('change');
			}
			break;
	}
});

module.exports = gameStore;
