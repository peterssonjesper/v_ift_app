var eventEmitter = require('events').EventEmitter;
var dispatcher = require('./../singletons/dispatcher.js');
var _ = require('lodash');

var states = {
	WAITING_FOR_READY_SIGNAL: 'WAITING_FOR_READY_SIGNAL',
	JOINING_LOBBY: 'JOINING_LOBBY'
};

var _game = {
	state: states.JOINING_LOBBY,
	playerToken: ''
};

var gameStore = _.assign({}, eventEmitter.prototype, {

	getState: function () {
		return _game.state;
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
	}
});

module.exports = gameStore;
