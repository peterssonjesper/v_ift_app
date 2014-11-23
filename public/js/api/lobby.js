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
		$.get(BASE_API_URL + '/getlobby/' + lobbyId, {
			playerId: playerToken
		}, function (response) {
			callback(response);
		});
	},

	ready: function (lobbyId, playerToken, callback) {
		$.post(BASE_API_URL + '/ready', {
			lobbyId: lobbyId,
			playerId: playerToken
		}, function (response) {
			callback(response);
		});
	},

	states: {
		WAITING: 'Waiting',
		ONGOING: 'Ongoing',
		FINISHED: 'Finish'
	}

};
