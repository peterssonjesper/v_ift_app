var dispatcher = require('./../singletons/dispatcher.js');
var lobbyApi = require('./../api/lobby.js');

module.exports = {

	join: function (lobbyName, playerName) {
		dispatcher.dispatch({
			action: 'JOINING_LOBBY'
		});

		lobbyApi.join(lobbyName, playerName, function (playerToken) {
			dispatcher.dispatch({
				action: 'JOINED_LOBBY',
				playerToken: playerToken,
				lobbyName: lobbyName
			});
		});
	},

	fetchStatus: function (lobbyName) {
		lobbyApi.status(lobbyName, function (status) {
			dispatcher.dispatch({
				action: 'FETCHED_LOBBY_STATUS',
				lobbyName: lobbyName,
				status: status
			});
		});
	}

};
