var dispatcher = require('./../singletons/dispatcher.js');
var workoutApi = require('./../api/workout.js');

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
		console.log('reporting position', position);
	}

};
