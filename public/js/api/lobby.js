module.exports = {

	join: function (lobbyName, playerName, callback) {
		console.log('joining ' + lobbyName + ' with name ' + playerName);
		setTimeout(function () {
			var playerToken = "21738917398";
			callback(playerToken);
		}, 500);
	},

	status: function (lobbyName, callback) {
		console.log('fetching status for ' + lobbyName);
		setTimeout(function () {
			callback({
				maxDistance: 5000.0,
				status: 'waiting_for_players_to_get_ready',
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
	}

};
