var $ = require('jquery');

var BASE_API_URL = 'http://viftapi.apphb.com';

module.exports = {

	reportPosition: function (lat, lng, lobbyId, playerToken, callback) {
		$.post(BASE_API_URL + '/position', {
			lobbyId: lobbyId,
			playerId: playerToken,
			lat: lat,
			lng: lng
		}, function (response) {
			callback(response);
		});
	}

};
