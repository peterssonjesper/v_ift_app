var dispatcher = require('./../singletons/dispatcher.js');
var geoApi = require('./../api/geo.js');
var lobbyStore = require('./../stores/lobby.js');
var gameStore = require('./../stores/game.js');

module.exports = {

	askForPermission: function () {

		dispatcher.dispatch({
			action: 'GEO_POSITION_PENDING'
		});
		navigator.geolocation.getCurrentPosition(function () {
			dispatcher.dispatch({
				action: 'GEO_POSITION_ALLOWED'
			});
		}, function () {
			dispatcher.dispatch({
				action: 'GEO_POSITION_NOT_ALLOWED'
			});
		}, {
			timeout: 10000,
		});
	},

	watchPosition: function () {
		var errorOnGetPosition = function (err) {
			console.log(err);
		};

		navigator.geolocation.watchPosition(this._reportPosition, function () {}, {
			maximumAge: 3000,
			timeout: 5000,
			enableHighAccuracy: true
		});
	},

	_reportPosition: function (position) {
		geoApi.reportPosition(position.lat, position.lng, lobbyStore.getId(), gameStore.getPlayerToken());
	}

};
