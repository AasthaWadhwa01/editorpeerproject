const logger = require('../../services/app.logger');
const appConstant = require('../../config').app;
const UserModel = require('./users.entity')
const profileConfig = require('../../config/profile.config');

//Save new user details
const saveUserCredentials = function(userInfo, done) {
    UserModel.findOrCreate({ userId: userInfo.userId }, {

        publicRepos: userInfo.publicRepos,
        avatarUrl: userInfo.avatarUrl,
        userId: userInfo.userId

    }, function(err, user) {
        if (err) {
            logger.info("error occured in user controller " + err)

        } else if (!user) {
            logger.info("user not saved")
        } else {
            logger.info('saved successfully')
            return done(err, user);
        }
    });
};

// get user details with the given userId
const getProfile = function(getId) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ userId: getId }, (err, data) => {
            if (err) {
                logger.error(profileConfig.INTERNAL_ERROR + err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

//Update user details
const updateUserProfile = function(profileInfo, getId) {
    let userId = getId + "";
    return new Promise((resolve, reject) => {
       UserModel.updateOne({ "userId": userId }, {
           $set: {
               firstName: profileInfo.firstName,
               lastName: profileInfo.lastName,
               email: profileInfo.email,
               gender: profileInfo.gender,
               bio: profileInfo.bio,
               company: profileInfo.company,
               website: profileInfo.website
           }
       }, { upsert: true }, (err, data) => {
           if (err) {
               reject(err);
           } else if (data) {
               resolve(data);
           }
       })

    })
}
//create personel access token
const createToken = function(profileInfo, getId) {
    let userId = getId + "";

    return new Promise((resolve, reject) => {

        UserModel.findOneAndUpdate({ "userId": userId }, {
            $set: {
                accessToken: profileInfo
            }
        }, { new: true }, (err, data) => {
            if (err) {
                reject(err);
            } else if (data) {
                resolve(data);
            }
        })

    })
}

// update profile picture of a user with given userId
const updateImage = function(dataObj, getId) {
    let userId = getId;
    let img = dataObj.img;
    return new Promise((resolve, reject) => {

        UserModel.findOneAndUpdate({ userId: userId }, {
            $set: {
                avatarUrl: appConstant.URL + img
            }
        }, { new: true }, (err, data) => {
            if (err) {
                reject(err);
            } else if (data) {
                resolve(data);
            }
        })

    })
}


module.exports = {
    saveUserCredentials: saveUserCredentials,
    getProfile: getProfile,
    updateUserProfile: updateUserProfile,
    updateImage: updateImage,
    createToken: createToken
};