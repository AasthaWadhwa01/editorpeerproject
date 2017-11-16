const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const logger = require('../../services/app.logger');
const usrCtrl = require('./users.controller');
const appConfig = require('../../config').app;

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
          return res.status(500).send({ error: errResult});
        });
  } catch (err) {
    logger.fatal('Exception occurred' + err);
    res.send({ error: err });
    return;
  }
});


//route to get user details for the given userId
 router.get('/:userId',function(req,res){
  let getId= req.params.userId;
  try {
    usrCtrl.getProfile(getId).then((successResult)=>{
      logger.info('Get successResult successfully and return back');
      return res.json({status:201,message:'User details successfully retrieved',data:successResult})
    }, (errResult) => {
          logger.error(errResult);
          return res.json({status:500,message:'Incorrect credentials',data:errResult})
        });
  } catch (err) {
    logger.fatal('Exception occurred' + err);
    return res.json({status:false,message:'Exception occurred',data:err})
  }
 })

//route to update profile information for the given userId
 router.put('/profileInfo/:userId',function(req,res){
  let getId= req.params.userId;
  let profileInfo = req.body;
  try{
      usrCtrl.updateUserProfile(profileInfo,getId).then((successResult)=>{
      logger.info('Get successResult successfully and return back');
      /*return res.status(201).send(successResult);*/
      return res.json({status:201,message:'UserProfile successfully updated',data:successResult})
    }),(errResult)=>{
        logger.error(errResult);
        /*return res.status(500).send({ error: errResult});*/
        return res.json({status:500,message:'UserProfile cannot be updated due to some error',data:errResult})
      }
   }catch(err){
    logger.fatal('Exception occurred' + err);
    /*res.send({ error: err });*/
    return res.json({status:false,message:'Exception occurred',data:err})
   }
 })

//route to update profile image for the given userId
 router.put('/image/:userId',function(req,res){
  let getId= req.params.userId;
  let profileInfo = req.body;
   try{
    upload(req, res, function(err) {
     if (err) {
       return res.json({status:false,message:'Error occurred',data:err})  
     }
     else {
      let dataObj={
        img:req.files[0].filename
      }
       usrCtrl.updateImage(dataObj,getId).then(successResult=>{
        return res.json({status:201,message:'Image successfully updated',data:successResult})
       },error=>{
         return res.json({status:false,message:'Error occurred in updating image',data:error})
       }); 
    }
  });
   }catch(err){
    logger.fatal('Exception occurred' + err);
    return res.json({status:false,message:'Exception occurred',data:err})
   }
 })

function fileUpload(fileObj){
  upload(req, res, function(err) {
   if (err) {
     return res.json({status:false,message:'Error occurred',data:err})  
   }
   else {
    let dataObj={
      img:req.files[0].filename
    }
     usrCtrl.updateImage(dataObj,getId).then(successResult=>{
      /*return res.status(201).send(successResult);*/
      return res.json({status:201,message:'Image successfully updated',data:successResult})
     },error=>{
       return res.json({status:false,message:'Error occurred in updating image',data:error})
     }); 
  }
  });
 }


 module.exports = router;