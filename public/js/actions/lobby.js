var dispatcher = require('./../singletons/dispatcher.js');
var lobbyApi = require('./../api/lobby.js');

module.exports = {

	join: function (lobbyId, playerName) {
		dispatcher.dispatch({
			action: 'JOINING_LOBBY'
		});

		lobbyApi.join(lobbyId, playerName, function (response) {
			dispatcher.dispatch({
				action: 'JOINED_LOBBY',
				lobbyName: '',
				playerToken: response.playerToken,
				maxDistance: response.distance,
				players: response.players
			});
		});
	},

	fetchStatus: function (lobbyId, playerToken) {
		lobbyApi.status(lobbyId, playerToken, function (response) {
			dispatcher.dispatch({
				action: 'FETCHED_LOBBY_STATUS',
				players: response.players,
				maxDistance: response.distance,
				status: response.status
			});
		});
	},

	ready: function (lobbyId, playerToken) {
		lobbyApi.ready(lobbyId, playerToken, function (status) {
			dispatcher.dispatch({
				action: 'PLAYER_IS_READY',
				status: status
			});
		});
	}

};
