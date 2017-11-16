const router = require('express').Router();
const logger = require('../../services/app.logger');
const usrCtrl = require('./snippet.controller');
const appConfig = require('../../config').app;

/*
 * variable for snippet  schema 
 */
const snippet =require ('./snippet.entity');

/*
 * saving snippet into database 
 */
 router.post('/', function(req, res) {


  let snippetData = req.body;
  logger.debug('User persistent started');
  try {
    if (!snippetData) {
      logger.error('userData not found');
      throw new Error('Invalid inputs passed...!');
    }

    usrCtrl.addSnippet(snippetData).then((successResult) => {
      logger.info('Get successResult successfully and return back');
      return res.status(201).send(successResult);
    }, (errResult) => {
          logger.error(errResult);
          return res.status(500).send({ error: errResult});
        });
  } catch (err) {
    logger.fatal('Exception occurred' + err);
    res.json({status: 500, message: "Internal Server Error", data: err });
    return;
  }
});

/*
 * get snippet from database and showing it into editor 
 */
router.get('/', function(req, res) {
  //console.log(res)
  logger.debug('User persistent started');
  try {
    usrCtrl.getSnippet( ).then((successResult) => {
      logger.info('Get successResult successfully and return back');
      return res.status(201).send(successResult);
    }, (errResult) => {
          logger.error(errResult);
          return res.status(500).send({ error: errResult});
        });
  } catch (err) {
    logger.fatal('Exception occurred' + err);
    res.json({status: 500, message: "Internal Server Error", data: err });
    return;
  }
});

/*
 * Modify code of snippet 
 */
router.put('/update', (req, res) => {  

let  getValue= req.body.title; 
let snippetUpdate = req.body.code;
  logger.debug('User persistent started');
  try {
    usrCtrl.updateSnippet(getValue, snippetUpdate).then((successResult) => {
      logger.info('Get successResult successfully and return back');
      return res.status(201).send(successResult);
    }, (errResult) => {
          logger.error(errResult);
          return res.status(500).send({ error: errResult});
        });
  } catch (err) {
    logger.fatal('Exception occurred' + err);
     res.json({status: 500, message: "Internal Server Error", data: err });
    return;
  }
});

/*
 *Api to  Remove snippet 
 */
router.delete('/delete', (req, res) => {  

let  getValue= req.body.title; 
let snippetUpdate = req.body.code;
  logger.debug('User persistent started');
  try {
    usrCtrl.deleteSnippet(getValue, snippetUpdate).then((successResult) => {
      logger.info('Get successResult successfully and return back');
      return res.status(201).send(successResult);
    }, (errResult) => {
          logger.error(errResult);
          return res.status(500).send({ error: errResult});
        });
  } catch (err) {
    logger.fatal('Exception occurred' + err);
     res.json({status: 500, message: "Internal Server Error", data: err });
    return;
  }
});

 module.exports = router;




