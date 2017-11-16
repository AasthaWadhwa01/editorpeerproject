const forumModel = require('./forum.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const logConfig = require('../../config/loggerConstants');

//Post forum question function
const addPost = function(formdata) {
	return new Promise((resolve, reject) => {
		forumModel.create(formdata, (err, data) => {
			if (err) {
				logger.error(logConfig.INTERNAL_ERROR + err);
				reject(err);
			} else {
				resolve(data);
			}
		})
	})

};

//get forum question function
const getPost = function() {
	return new Promise((resolve, reject) => {
		forumModel.find({}, (err, data) => {
			if (err) {
				logger.error(logConfig.INTERNAL_ERROR + err);
				reject(err);
			} else {
				resolve(data);
			}
		})
	})

};

//post answer by question
const getPostById = function(Id) {
	return new Promise((resolve, reject) => {
		forumModel.findOne({ _id: Id }, (err, data) => {
			if (err) {
				logger.error(logConfig.INTERNAL_ERROR + err);
				reject(err);
			} else {
				resolve(data);
			}
		})
	})

};

//search question of function
const getSearch = function(getValue) {
	return new Promise((resolve, reject) => {
		forumModel.find({
			$or: [{
					"questionTitle": {
						"$regex": getValue,
						"$options": "i"
					}
				}, {
					"problemDescription": {
						"$regex": getValue,
						"$options": "i"
					}
				},
				{
					"tags.display": {
						"$regex": getValue,
						"$options": "i"
					},
					"tags.value": {
						"$regex": getValue,
						"$options": "i"
					}
				}
			]
		}, (err, data) => {
			if (err) {
				logger.error(logConfig.INTERNAL_ERROR + err);
				reject(err);
			} else {
				resolve(data);
			}
		})
	})
};

//save answer of question
const saveAnswer = function(getValue, updateValue) {
	return new Promise((resolve, reject) => {
		forumModel.update({
			'_id': getValue
		}, {
			$push: { 'answers': updateValue }
		}, { upsert: true }, (err, data) => {
			if (err) {
				logger.error(logConfig.INTERNAL_ERROR + err);
				reject(err);
			} else {
				resolve(data);
			}
		})
	});
};

//save likes on a  question
const saveLike = function(getValue, updateValue) {
	return new Promise((resolve, reject) => {
		forumModel.findOne({ _id: getValue }, (err, data) => {
			if (err) {
				logger.error(logConfig.INTERNAL_ERROR + err);
				reject(err);
			} else {
				resolve(data);
				forumModel.findOneAndUpdate({ _id: getValue, 'likes.userId': updateValue.userId }, {
					$pull: {
						likes: {
							'userId': updateValue.userId
						}
					}
				}, { 'new': true }, (err, data) => {
					if (err) {
						logger.error(logConfig.INTERNAL_ERROR + err);
						reject(err);
					} else {
						if (data) {
							resolve(data);
						} else {
							forumModel.findOneAndUpdate({
								'_id': getValue
							}, {
								$push: {
									likes: { 'userId': updateValue.userId }
								}
							}, { 'new': true }, (err, data) => {
								if (err) {
									logger.error(logConfig.INTERNAL_ERROR + err);
									reject(err);
								} else {
									if (data) {
										forumModel.findOneAndUpdate({
											_id: getValue,
											'dislikes.userId': updateValue.userId
										}, {
											$pull: {
												dislikes: { 'userId': updateValue.userId }
											}
										}, { 'new': true }, (err, data) => {
											if (err) {
												logger.error(logConfig.INTERNAL_ERROR + err);
												reject(err);
											} else {
												resolve(data);
											}
										})
									} else {
										resolve(data);
									}
								}
							})
						}
					}

			   })

		   }
		})
	})
}

//save dislike of question
const saveDislike = function(getValue, updateValue) {
	return new Promise((resolve, reject) => {
		forumModel.findOne({ _id: getValue }, (err, data) => {
			if (err) {
				logger.error(logConfig.INTERNAL_ERROR + err);
				reject(err);
			} else {
				forumModel.findOneAndUpdate({ _id: getValue, 'dislikes.userId': updateValue.userId }, {
					$pull: {
						dislikes: {
							'userId': updateValue.userId
						}
					}
				}, { 'new': true }, (err, data) => {
					if (err) {
						logger.error(logConfig.INTERNAL_ERROR + err);
						reject(err);
					} else {
						if (data) {
							resolve(data);
						} else {
							forumModel.findOneAndUpdate({
								'_id': getValue
							}, {
								$push: {
									dislikes: { 'userId': updateValue.userId }
								}
							}, { 'new': true }, (err, data) => {
								if (err) {
									logger.error(logConfig.INTERNAL_ERROR + err);
									reject(err);
								} else {
									if (data) {
										forumModel.findOneAndUpdate({
											_id: getValue,
											'likes.userId': updateValue.userId
										}, {
											$pull: {
												likes: { 'userId': updateValue.userId }
											}
										}, { 'new': true }, (err, data) => {
											if (err) {
												logger.error(logConfig.INTERNAL_ERROR + err);
												reject(err);
											} else {
												resolve(data);
											}
										})
									} else {
										resolve(data);
									}
								}
							})
						}
					}
				})
			}
		})
	})
};


module.exports = {
	addPost: addPost,
	getPost: getPost,
	getSearch: getSearch,
	getPostById: getPostById,
	saveAnswer: saveAnswer,
	saveLike: saveLike,
	saveDislike: saveDislike
};