var dispatcher = require('./../singletons/dispatcher.js');
var workoutApi = require('./../api/workout.js');

module.exports = {

	reportPosition: function (position, playerToken, lobbyId) {
		console.log('reporting position', position);
	},

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
		var didGetPosition = function (position) {
			workoutActions.reportPosition(position.coords, gameStore.getPlayerToken(), lobbyStore.getId());
		};

		var errorOnGetPosition = function (err) {
			console.log(err);
		};

		navigator.geolocation.watchPosition(didGetPosition, errorOnGetPosition, {
			maximumAge: 3000,
			timeout: 5000,
			enableHighAccuracy: true
		});
	}

};
