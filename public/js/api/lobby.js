module.exports = {

	join: function (lobbyName, playerName, callback) {
		console.log('joining ' + lobbyName + ' with name ' + playerName);
		setTimeout(function () {
			var playerToken = "21738917398";
			callback(playerToken);
		}, 500);
	}

};
