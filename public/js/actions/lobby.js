var dispatcher = require('./../singletons/dispatcher.js');
var lobbyApi = require('./../api/lobby.js');

module.exports = {

	join: function (lobbyName, playerName) {
		dispatcher.dispatch({
			action: 'JOINING_LOBBY'
		});

		lobbyApi.join(lobbyName, playerName, function () {
			dispatcher.dispatch({
				action: 'JOINED_LOBBY'
			});
		});
	}

};
