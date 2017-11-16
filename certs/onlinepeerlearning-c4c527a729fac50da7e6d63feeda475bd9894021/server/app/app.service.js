const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
var passport = require('passport');
var methodOverride = require('method-override');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');
var util = require('util');
var session = require('express-session');
const jwt = require('jsonwebtoken');

const helper = require('./../api/chat/chat.controller');
const loginconfig = require('../config/login.config')
const fileUploader = require('../api/users/users.router')
const appRoutes = require('./app.router');
const logger = require('../services/app.logger');
const config = require('../config');
const loginController = require('./../api/login/login.controller')
const loggerConfig = config.loggerConstant;
const db = config.db;
const gitId = config.app;

//login function of git called by app.js
function loginviagit() {
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});
	passport.use(new GitHubStrategy({
		clientID: gitId.CLIENT_ID,
		clientSecret: gitId.CLIENT_SECRET,
		callbackURL: gitId.CALLBACK_URL
	}, function(accessToken, refreshToken, profile, done) {
		let userInfo = {
			name: profile._json.login,
			userId: profile.id,
			avatarUrl: profile._json.avatar_url,
			publicRepos: profile._json.public_repos,
			reposUrl: profile._json.repos_url,
			online: loginconfig.ONLINE
		}
		//save login credentials in login collection
		//function called by login controller
		loginController.saveLoginCredentials(userInfo, done);
	}));
}
// Create express app
function createApp() {
	const app = express();
	app.use(cors());
	return app;
}
//  Use application routes
function setupRestRoutes(app) {
	appRoutes.useRoutes(app);


	// app.use(function(req, res) {
	//     let err = new Error(loggerConfig.RESOURCE_NOT_FOUND);
	//     err.status = 404;
	//     logger.error(err);
	//     return res.status(err.status).json({
	//         error: err.message
	//     });
	// });

	// app.use(function(err, req, res) {
	//     logger.error(loggerConfig.INTERNAL_SERVER_ERROR + ': ', err);
	//     return res.status(err.status || 500).json({
	//         error: err.message
	//     });
	// });


	app.use(function(req, res) {
		let err = new Error(loggerConfig.RESOURCE_NOT_FOUND);
		err.status = 404;
		logger.error(err);
		return res.status(err.status).json({
			error: err.message
		});
	});
	app.use(function(err, req, res) {
		logger.error(loggerConfig.INTERNAL_SERVER_ERROR + ': ', err);
		return res.status(err.status || 500).json({
			error: err.message
		});
	});

	return app;
}
//  Use application middlewares
function setupMiddlewares(app) {
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(compression());
	app.use(methodOverride());
	app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(partials());
	return app;
}
// Initialize MongoDB database connection
function setupMongooseConnections() {
	mongoose.connect(db.MONGO.URL);
	mongoose.connection.on('connected', function() {
		logger.debug(loggerConfig.MONGODB_CONNECTED);
	});
	mongoose.connection.on('error', function(err) {
		logger.error(loggerConfig.MONGODB_CONNECTION_ERROR + ' : ', err);
	});
	mongoose.connection.on('disconnected', function() {
		logger.debug(loggerConfig.MONGODB_DISCONNECTED);
	});
	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			logger.info(loggerConfig.MONGODB_DISCONNECTED_ON_PROCESS_TERMINATION);
			process.exit(0);
		});
	});
}

function socketEvents(io) {
	io.on('connection', (socket) => {
		/**
		 * get the user's Chat list
		 */
		socket.on('chat-list', (data) => {
			let chatListResponse = {};
			if (data.userId == '') {
				chatListResponse.error = true;
				chatListResponse.message = `User does not exits.`;
				io.emit('chat-list-response', chatListResponse);
			} else {
				helper.getUserInfo(data.userId, (err, UserInfoResponse) => {
					delete UserInfoResponse.password;
					helper.getChatList(socket.id, (err, response) => {
						io.to(socket.id).emit('chat-list-response', {
							error: false,
							singleUser: false,
							chatList: response
						});
						socket.broadcast.emit('chat-list-response', {
							error: false,
							singleUser: true,
							chatList: UserInfoResponse
						});
					});
				});
			}
		});
		/**
		 * send the messages to the user
		 */
		socket.on('add-message', (data) => {
			if (data.message === '') {
				io.to(socket.id).emit(`add-message-response`, `Message cant be empty`);
			} else if (data.fromUserId === '') {
				io.to(socket.id).emit(`add-message-response`, `Unexpected error, Login again.`);
			} else if (data.toUserId === '') {
				io.to(socket.id).emit(`add-message-response`, `Select a user to chat.`);
			} else {
				let toSocketId = data.toSocketId;
				let fromSocketId = data.fromSocketId;
				delete data.toSocketId;
				data.timestamp = Math.floor(new Date() / 1000);
				helper.insertMessages(data, (error, response) => {
					io.to(toSocketId).emit(`add-message-response`, data);
				});
			}
		});

		socket.on('disconnect', () => {
			socket.broadcast.emit('chat-list-response', {
				error: false,
				userDisconnected: true,
				socketId: socket.id
			});
		});

		socket.on('send-file', (fileObj) => {
			fileUploader.fileUpload(fileObj);
		})
	});
}
module.exports = {
	createApp: createApp,
	setupRestRoutes: setupRestRoutes,
	setupMiddlewares: setupMiddlewares,
	setupMongooseConnections: setupMongooseConnections,
	loginviagit: loginviagit,
	socketEvents: socketEvents
};