var $ = require('jquery');

var BASE_API_URL = 'http://viftapi.apphb.com';

module.exports = {

	join: function (lobbyId, playerName, callback) {
		$.post(BASE_API_URL + '/join', {
			lobbyId: lobbyId,
			playerName: playerName
		}, function (response) {
			console.log(response);
			callback(playerToken);
		});
		callback('213456'); // TODO
	},

	status: function (lobbyId, playerToken, callback) {
		console.log('fetching status for ' + lobbyId);
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
