var eventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var geoActions = require('./../actions/geo.js');
var gameStore = require('./../stores/game.js');
var dispatcher = require('./../singletons/dispatcher.js');

var _geo = {
	currentPosition: {
		lat: 0,
		lng: 0
	},
	status: 'NOT_ASKED'
};

var geoStore = _.assign({}, eventEmitter.prototype, {

	getPosition: function () {
		return _geo.currentPosition;
	},

	getStatus: function () {
		return _geo.status;
	}

});

geoStore.dispatchToken = dispatcher.register(function(payload) {
	dispatcher.waitFor([gameStore.dispatchToken]);

	switch (payload.action) {
		case 'GEO_POSITION_NOT_ALLOWED':
			_geo.currentPosition = payload.position;
			_geo.status = 'NOT_ALLOWED';
			geoStore.emit('change');
			break;
		case 'GEO_POSITION_ALLOWED':
			_geo.currentPosition = payload.position;
			_geo.status = 'ALLOWED';
			geoStore.emit('change');
			break;
		case 'GEO_POSITION_PENDING':
			_geo.status = 'PENDING';
			geoStore.emit('change');
			break;
		case 'FETCHED_LOBBY_STATUS':
			if (gameStore.getState() === gameStore.states.ONGOING) {
				geoActions.watchPosition();
			}
			break;
	}
});

module.exports = geoStore;
