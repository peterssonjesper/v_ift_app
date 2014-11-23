var dispatcher = require('./../singletons/dispatcher.js');

module.exports = {

	join: function (lobbyName, playerName) {
		console.log('joining ' + lobbyName + ' with name ' + playerName);
		dispatcher.dispatch({
			action: 'JOINING_LOBBY'
		});
	}

};
