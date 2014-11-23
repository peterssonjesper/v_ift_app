var $ = require('jquery');

var BASE_API_URL = 'http://viftapi.apphb.com';

module.exports = {

	join: function (lobbyId, playerName, callback) {
		$.post(BASE_API_URL + '/join', {
			lobbyId: lobbyId,
			playerName: playerName
		}, function (response) {
			callback(response);
		});
	},

	status: function (lobbyId, playerToken, callback) {
		$.get(BASE_API_URL + '/lobby/' + lobbyId, {
			playerId: playerToken
		}, function (response) {
			console.log('got status response', response);
			callback(response);
		});
		setTimeout(function () {
			callback({
				distance: 5000.0,
				status: 'Waiting',
				players: [
					{
						name: "Petter",
						isReady: true,
						distance: 0
					},
					{
						name: "Christoffer",
						isReady: false,
						distance: 0
					}
				]
			});
		}, 200);
	},

	ready: function (lobbyId, playerToken, callback) {
		setTimeout(function () {
			callback({
				maxDistance: 5000.0,
				status: 'Ongoing',
				players: [
					{
						name: "Petter",
						isReady: true,
						distance: 0
					},
					{
						name: "Christoffer",
						isReady: true,
						distance: 0
					}
				]
			});
		}, 200);
	},

	states: {
		WAITING: 'Waiting',
		ONGOING: 'Ongoing',
		FINISHED: 'Finished'
	}

};
