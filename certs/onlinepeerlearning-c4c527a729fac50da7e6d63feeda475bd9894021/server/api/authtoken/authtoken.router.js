const router = require('express').Router();
//const passport = require('passport')

const logger = require('../../services/app.logger');
const authCtrl = require('./authtoken.controller');
const appConfig = require('../../config').app;

router.use(function(req, res, next) {
    try {
        // check header or url parameters or post parameters for token
        logger.debug('Authorization begin by getting token from http request');
        const token = req.body.token || req.headers.authorization || req.query.token;
        // decode token
        if (token) {

            authCtrl.verifyToken(token).then((successResult) => {
                logger.info('Token verified');
                req.decoded = successResult.decoded;
                req.authToken = successResult.authToken;
                next();
            }, (errResult) => {
                logger.error('Invalid token provided');
                return res.status(403).send({ error: errResult, message: 'UnAuthorised User' });
            });
        } else {
            // if there is no token
            // return an error
            logger.info('Token not provided');
            return res.status(403).send({
                message: 'No token provided.',
                success: false
            });
        }
    } catch (error) {
        return error;
    }
});


module.exports = router;