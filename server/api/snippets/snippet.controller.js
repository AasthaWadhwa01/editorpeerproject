const snippetModel = require('./snippet.entity');
const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;

//Save new snippet details
const addSnippet = function(data) {
   return new Promise((resolve, reject) => {
       snippetModel.create(data, (err, data) => {
           if (err) {
               logger.error('Internal error' + err);
               reject(err);
           } else {
               logger.error('Internal error' + err);
               resolve(data);
           }
       })
   })

};

const getSnippet = function() {
   return new Promise((resolve, reject) => {

       snippetModel.find({}, (err, data) => {
           if (err) {
               logger.error('Internal error' + err);
               reject(err);
           } else {
               logger.error('Internal error' + err);
               resolve(data);
           }
       })
   })

};


 const  updateSnippet = function(getValue, updateValue) {
       return new Promise((resolve, reject) => {

               
       snippetModel.findOneAndUpdate({
                 'title': getValue}, {
                        $set: {
                   'code': updateValue.code,
                   'title': updateValue.title,
                   'language': updateValue.language
                   } },(err, data) => {
                           if (err) {
                               logger.error('Internal error' + err);
                               reject(err);
                           } else {
                               logger.error('Internal error' + err);
                               resolve(data);
                           }
                       }
                     )
             });
     };

     const  deleteSnippet = function(getValue) {
       return new Promise((resolve, reject) => {

              snippetModel.remove({
                 'title': getValue},(err, data) => {
                           if (err) {
                               logger.error('Internal error' + err);
                               reject(err);
                           } else {
                               logger.error('Internal error' + err);
                               resolve(data);
                           }
                       }
                     )
             });
     };


       module.exports = {
           addSnippet: addSnippet,
           getSnippet:  getSnippet,
           updateSnippet : updateSnippet,
           deleteSnippet: deleteSnippet

       };