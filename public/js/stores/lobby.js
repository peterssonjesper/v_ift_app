var eventEmitter = require('events').EventEmitter;
var dispatcher = require('./../singletons/dispatcher.js');
var _ = require('lodash');

var states = {
	IS_JOINING_LOBBY: 'IS_JOINING_LOBBY',
	HAS_JOINED_LOBBY: 'HAS_JOINED_LOBBY',
	HAS_NOT_JOINED_LOBBY: 'HAS_NOT_JOINED_LOBBY'
};

var _lobby = {
	state: states.HAS_NOT_JOINED_LOBBY
};

var lobbyStore = _.assign({}, eventEmitter.prototype, {

	getState: function () {
		return _lobby.state;
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
			lobbyStore.emit('change');
			break;
	}
});

module.exports = lobbyStore;
