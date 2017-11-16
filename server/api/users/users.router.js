const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const logger = require('../../services/app.logger');
const usrCtrl = require('./users.controller');
const appConfig = require('../../config').app;
const profileConfig = require('../../config/profile.config');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'server/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.slice(0, file.originalname.lastIndexOf('.')) + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage }).any();

/*
 * Actual URI will be HTTP POST /users/
 */
router.post('/', function(req, res) {
    let userData = req.body;
    logger.debug('User persistent started');
    try {
        if (!userData) {
            logger.error('userData not found');
            throw new Error('Invalid inputs passed...!');
        }

        usrCtrl.registerNewUser(userData, 'appConstant.INSERT_TYPE.PROFILES').then((successResult) => {
            logger.info('Get successResult successfully and return back');
            return res.status(201).send(successResult);
        }, (errResult) => {
            logger.error(errResult);
            return res.status(500).send({ error: errResult });
        });
    } catch (err) {
        logger.fatal('Exception occurred' + err);
        res.send({ error: err });
        return;
    }
});


//route to get user details for the given userId
router.get('/:userId', function(req, res) {
    let getId = req.params.userId;
    try {
        usrCtrl.getProfile(getId).then((successResult) => {
            logger.info(profileConfig.SUCCESS_RESULT);
            return res.status(201).json({ status: true, message: profileConfig.USER_DETAIL, data: successResult })
        }, (errResult) => {
            logger.error(errResult);
            return res.status(500).json({ status: false, message: profileConfig.INCORRECT_CREDENTIALS, data: errResult })
        });
    } catch (err) {
        logger.fatal(profileConfig.EXCEPTION_OCCURRED + err);
        return res.status(500).json({ status: false, message: profileConfig.EXCEPTION_OCCURRED, data: err })
    }
})

//route to update profile information for the given userId
router.put('/profileInfo/:userId', function(req, res) {
    let getId = req.params.userId;
    let profileInfo = req.body;
    try {
        usrCtrl.updateUserProfile(profileInfo, getId).then((successResult) => {
            logger.info(profileConfig.SUCCESS_RESULT);
            return res.status(201).json({ status: true, message: profileConfig.USER_PROFILE, data: successResult })
        }), (errResult) => {
            logger.error(errResult);
            return res.status(500).json({ status: false, message: profileConfig.USER_PROFILE_FAILED, data: errResult })
        }
    } catch (err) {
        logger.fatal(profileConfig.EXCEPTION_OCCURRED + err);
        return res.status(500).json({ status: false, message: profileConfig.EXCEPTION_OCCURRED, data: err })
    }
})


//route to update personal access token for given userId
router.put('/token/:userId', function(req, res) {
    let getId = req.params.userId;
    let profileInfo = req.body.token;
    try {
        usrCtrl.createToken(profileInfo, getId).then((successResult) => {
            logger.info(profileConfig.SUCCESS_RESULT);
            return res.json({ status: 201, message: profileConfig.TOKENCREATE, data: successResult })
        }), (errResult) => {
            logger.error(errResult);
            return res.json({ status: 500, message: profileConfig.TOKENNOTCREATE, data: errResult })
        }
    } catch (err) {
        logger.fatal(profileConfig.EXCEPTION_OCCURRED_TOKEN + err);
        return res.json({ status: false, message: profileConfig.EXCEPTION_OCCURRED_TOKEN, data: err })
    }
})

//route to update profile image for the given userId
router.put('/image/:userId', function(req, res) {
    let getId = req.params.userId;
    let profileInfo = req.body;
    try {
        upload(req, res, function(err) {
            if (err) {
                return res.status(500).json({ status: false, message: profileConfig.EXCEPTION_OCCURRED, data: err })
            } else {
                let dataObj = {
                    img: req.files[0].filename
                }
                usrCtrl.updateImage(dataObj, getId).then(successResult => {
                    return res.status(201).json({ status: true, message: profileConfig.IMAGE_ADDED, data: successResult })
                }, error => {
                    return res.status(500).json({ status: false, message: profileConfig.IMAGE_ERROR, data: error })
                });
            }
        });
    } catch (err) {
        logger.fatal(profileConfig.EXCEPTION_OCCURRED + err);
        return res.json({ status: false, message: profileConfig.EXCEPTION_OCCURRED, data: err })
    }
})



module.exports = router;