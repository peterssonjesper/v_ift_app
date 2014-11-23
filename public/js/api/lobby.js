module.exports = {

	join: function (lobbyId, playerName, callback) {
		console.log('joining ' + lobbyId + ' with name ' + playerName);
		setTimeout(function () {
			var playerToken = "21738917398";
			callback(playerToken);
		}, 500);
	},

	status: function (lobbyId, playerToken, callback) {
		console.log('fetching status for ' + lobbyId);
		setTimeout(function () {
			callback({
				maxDistance: 5000.0,
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
