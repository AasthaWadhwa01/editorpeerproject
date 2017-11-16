// let expect = require('chai').expect;
// let request = require('supertest');
// let sinon = require('sinon');
// let app = require('./../app/app');

// let loginModel = require('./../api/login/login.entity');
// let chatMsgModel = require('./../api/chat/chat.entity');

// let checkUserSessionStub = sinon.stub(loginModel.prototype,'')
// let gettingMessages = sinon.stub(chatMsgModel.prototype,'')

// describe('Get /api/chat/userSessionCheck', () => {
//   before(() => {
//   	checkUserSessionStub.yields(null, {
// 			userName: "Pulkit",
// 			userId: ,
// 			updatedAt:,
// 			online: ,
// 			timestamp:,
// 			socketId:
// 		});
//   })
//   it('checking user Session',(done) =>{
//   	request(app)
//   		.post('/api/chat/userSessionCheck')
//   		.send({
// 			userName: "Pulkit",
// 			userId: ,
// 			updatedAt:,
// 			online: ,
// 			timestamp:,
// 			socketId:
// 		})
//   		.end((err,res)=>{
//   			if(err) return err;
//   			else{
//   				expect(res.body).to.be.equal();
//   				done();
//   			}
//   		})
//   })
// })

// describe('Get /api/chat/getMessages', () => {
//   before(() => {
//   	gettingMessages.yields(null, {
// 			fromUserId:,
// 			message :'',
// 			toUserId:,
// 			fromSocketId:,
// 			timestamp:
// 		});
//   })
//   it('getting Messages from database',(done) =>{
//   	request(app)
//   		.post('/api/chat/getMessages')
//   		.send({
// 			fromUserId:,
// 			message :'',
// 			toUserId:,
// 			fromSocketId:,
// 			timestamp:
// 		})
//   		.end((err,res)=>{
//   			if(err) return err;
//   			else{
//   				expect(res.body).to.be.equal();
//   				done();
//   			}
//   		})
//   })
// })