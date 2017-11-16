const appConstant = require('../../config').app;
const loginModel = require('../login/login.entity')
const chatMsgModel = require('./chat.entity')

//This is for checking that user is in database or not
const checkUserSession = function(data, callback) {
	loginModel.findOne({ "userId": data.userId }, (err, result) => {
		callback(err, result);
	})
}

//This is for getting user information from database
const getUserInfo = function(userId, callback) {
	loginModel.findOne({ "userId": userId }, (err, result) => {
		callback(err, result);
	});
}

//This is for getting the Online users from database
const getChatList = function(userId, callback) {
	loginModel.find({ 'online': 'Y', 'socketId': { $ne: userId } }, (err, result) => {
		callback(err, result);
	});
}

//This is for inserting messages to database
const insertMessages = function(data, callback) {
	let msgModel = new chatMsgModel(data);
	msgModel.save((err, result) => {
		callback(err, result);
	});
}

//This is for getting message from database
const getMessages = function(userId, toUserId, callback) {
	const data = {
		'$or': [{
			'$and': [{
				'toUserId': userId
			}, {
				'fromUserId': toUserId
			}]
		}, {
			'$and': [{
				'toUserId': toUserId
			}, {
				'fromUserId': userId
			}]
		}, ]
	};

	chatMsgModel
		.find(data)
		.sort({ 'timestamp': 1 })
		.exec((err, result) => {
			callback(err, result)
		})

}

//This is for adding socketId to database for future reference
const addSocketId = function(data, callback) {
	loginModel.update({ "userId": data.id }, data.value, { upsert: true, 'new': true }, (err, result) => {
		result.userId = data.id;
		callback(err, result);
	})
}

module.exports = {
	checkUserSession: checkUserSession,
	getUserInfo: getUserInfo,
	getChatList: getChatList,
	insertMessages: insertMessages,
	getMessages: getMessages,
	addSocketId: addSocketId
};