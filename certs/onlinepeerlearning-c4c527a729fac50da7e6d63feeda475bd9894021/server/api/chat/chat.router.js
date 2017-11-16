const router = require('express').Router();
const logger = require('../../services/app.logger');
const helper = require('./chat.controller');
const appConfig = require('../../config').app;
const chatEntity = require('./chat.entity')
const chatRouteConfig = require('../../config').chatRouteConfig;

//This route is defined for checking the user information from database that user is valid user or not
router.post('/userSessionCheck', (request, response) => {
	let userId = request.body.userId;
	let sessionCheckResponse = {}
	helper.userSessionCheck({
		userId: userId,
	}, (error, result) => {
		if (result === null) {
			sessionCheckResponse.status = 503;
			sessionCheckResponse.message = chatRouteConfig.ERROR_MESSAGE;
			sessionCheckResponse.data = result
			response.status(503).json(sessionCheckResponse);
		} else {
			sessionCheckResponse.status = 200;
			sessionCheckResponse.data = result.userName;
			sessionCheckResponse.message = chatRouteConfig.USER_LOGGED;
			response.status(200).json(sessionCheckResponse);
		}
	});
});

//This route is for getting messages from database according to toUserId and fromUserId
router.post('/getMessages', (request, response) => {

	let userId = request.body.userId;
	let toUserId = request.body.toUserId;
	let messages = {}
	helper.getMessages(userId, toUserId, (error, result) => {
		if (error) {
			messages.status = 404;
			messages.message = chatRouteConfig.ERROR_MESSAGE;
			messages.data = error;
			response.status(404).json(messages);
		} else {
			messages.status = 200;
			messages.messages = chatRouteConfig.ERROR_MESSAGE;
			messages.data = result;
			response.status(200).json(messages);
		}
	});
});

module.exports = router;