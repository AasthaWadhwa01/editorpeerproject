const loginModel = require('./login.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const userController = require('./../users/users.controller');
const jwt = require('jsonwebtoken');
const appConfig = require('../../config').app;
const loginConfig = require('../../config/login.config');

//save new login user details
const saveLoginCredentials = function(userInfo, done) {
	loginModel.findOneAndUpdate({ userId: userInfo.userId, userName: userInfo.name }, {
		$set: {
			online: loginConfig.ONLINE
		}
	}, { upsert: true, 'new': true }, function(err, user) {
		if (err) {
			logger.info(loginConfig.LOGIN_USER + err)
		} else if (user) {
			logger.info(loginConfig.LOGIN)
			userController.saveUserCredentials(userInfo, done);
		}
	});
};

//get userName
const getUser = (userId) => {
	return new Promise((resolve, reject) => {
		loginModel.findOne({ userId: userId }, (err, data) => {
			if (err) {
				reject(err);
			} else if (data) {
				resolve(data)
			}
		})
	})
}

module.exports = {
	saveLoginCredentials: saveLoginCredentials,
	getUser: getUser,
};