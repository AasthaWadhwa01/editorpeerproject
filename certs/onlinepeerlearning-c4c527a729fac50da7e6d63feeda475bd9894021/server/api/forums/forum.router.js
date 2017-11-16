const router = require('express').Router();
const logger = require('../../services/app.logger');
const forumCtrl = require('./forum.controller');
const appConfig = require('../../config').app;
const logConfig = require('../../config/loggerConstants');

//post forum questions in a database
router.post('/', function(req, res) {
    let forumData = req.body;
    try {
        forumCtrl.addPost(forumData).then((successResult) => {
            logger.info(logConfig.POST_FORUM_QUESTION);
            return res.json({ status: 201, message: logConfig.POST_FORUM_QUESTION, data: successResult });
        }, (errResult) => {
            logger.error(errResult);
            return res.json({ status: 200, message: logConfig.POST_FORUM_QUESTION_ERROR, data: errResult });
        });
    } catch (err) {
        logger.fatal(logConfig.EXCEPTION_FOUND + err);
        return res.json({ status: 500, message: logConfig.EXCEPTION_FOUND, data: err });
    }
});

//get forum question from database
router.get('/', function(req, res) {
    try {
        forumCtrl.getPost().then((successResult) => {
            logger.info(logConfig.GET_FORUM_QUESTION);
            return res.json({ status: 201, message: logConfig.GET_FORUM_QUESTION, data: successResult });
        }, (errResult) => {
            logger.error(errResult);
            return res.json({ status: 200, message: logConfig.GET_FORUM_QUESTION_ERROR, data: errResult });
        });
    } catch (err) {
        logger.fatal(logConfig.EXCEPTION_FOUND + err);
        return res.json({ status: 500, message: logConfig.EXCEPTION_FOUND, data: err });
    }
});

//search forum questions from database
router.get('/term/:searchTerm', function(req, res) {
    let getValue = req.params.searchTerm;
    try {
        forumCtrl.getSearch(getValue).then((successResult) => {
            logger.info(logConfig.SEARCH_FORUM_QUESTION);
            return res.json({ status: 201, message: logConfig.SEARCH_FORUM_QUESTION, data: successResult });
        }, (errResult) => {
            logger.error(errResult);
            return res.json({ status: 200, message: logConfig.SEARCH_FORUM_QUESTION_ERROR, data: errResult });
        });
    } catch (err) {
        logger.fatal(logConfig.EXCEPTION_FOUND + err);
        return res.json({ status: 500, message: logConfig.EXCEPTION_FOUND, data: err });
    }
});

//get the question detail from database
router.get('/:id', function(req, res) {
    let id = req.params.id;
    try {
        forumCtrl.getPostById(id).then((successResult) => {
            logger.info(logConfig.GET_DATA_FROM_ID);
            return res.json({ status: 201, message: logConfig.GET_DATA_FROM_ID, data: successResult });
        }, (errResult) => {
            logger.error(errResult);
            return res.json({ status: 200, message: logConfig.GET_DATA_FROM_ID_ERROR, data: errResult });
        });
    } catch (err) {
        logger.fatal(logConfig.EXCEPTION_FOUND + err);
        return res.json({ status: 500, message: logConfig.EXCEPTION_FOUND, data: err });
    }
});

//add answers to paticular forum question
router.put('/:question', (req, res) => {
    let getValue = req.params.question;
    let forumUpdate = req.body;
    try {
        forumCtrl.saveAnswer(getValue, forumUpdate).then((successResult) => {
            logger.info(logConfig.ADD_ANSWER_ON_QUESTION);
            return res.json({ status: 201, message: logConfig.ADD_ANSWER_ON_QUESTION, data: successResult });
        }, (errResult) => {
            logger.error(errResult);
            return res.json({ status: 200, message: logConfig.ADD_ANSWER_ON_QUESTION_ERROR, data: errResult });
        });
    } catch (err) {
        logger.fatal(logConfig.EXCEPTION_FOUND + err);
        return res.json({ status: 500, message: logConfig.EXCEPTION_FOUND, data: err });
    }
});

module.exports = router;