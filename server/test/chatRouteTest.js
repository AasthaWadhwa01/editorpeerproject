// importing external modules
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = require('./../bin/www');
const chatModel = require('./../api/login/login.entity');
const expect = require('chai').expect
const supertest = require('supertest')
const sinon = require('sinon');
const chatStub = require('./login.test');


// test suite for routes in chat
describe('test cases for chat---to find if user exists or not', () => {
    // stubbing chat response
    beforeEach(function() {
        chatStub.yields(null, { "userName": "testUser", "userId": "123", "updatedAt": "10 Nov 2017", "updatedAt": "3 July 2017", "online": "Y", "timestamp": 1, "socketId": "123abc" })

    })

    //positive test case to check status returned in response
    it('positive test case', (done) => {
        supertest(app)
            .post('/api/chat/checkUserSession')
            .send({ "userId": "123" })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.status).to.be.equal(200)
                    done()
                }
            })

    })
    // negative test case to check status returned in response
    it('negative test case', (done) => {
        supertest(app).post('/api/chat/checkUserSession')
            .send({ "userName": "testUser", "userId": "123", "updatedAt": "10 Nov 2017", "updatedAt": "3 July 2017", "online": "Y", "timestamp": 1, "socketId": "123abc" })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.status).not.to.be.equal(201)
                    done()
                }
            })
    })
    // positive test case to check data returned in response
    it('positive test case', (done) => {
        supertest(app).post('/api/chat/checkUserSession')
            .send({ "userName": "testUser", "userId": "123", "updatedAt": "10 Nov 2017", "updatedAt": "3 July 2017", "online": "Y", "timestamp": 1, "socketId": "123abc" })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.data).to.be.equal("testUser")
                    done()
                }
            })
    })

    // negative test case to check data returned in response
    it('negative test case', (done) => {
        supertest(app).post('/api/chat/checkUserSession')
            .send({ "userName": "testUser", "userId": "123", "updatedAt": "10 Nov 2017", "updatedAt": "3 July 2017", "online": "Y", "timestamp": 1, "socketId": "123abc" })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.data).not.to.be.equal("testUser1")
                    done()
                }
            })
    })

    //positive test case to check message in response
    it('positive test case', (done) => {
        supertest(app).post('/api/chat/checkUserSession')
            .send({ "userName": "testUser", "userId": "123", "updatedAt": "10 Nov 2017", "updatedAt": "3 July 2017", "online": "Y", "timestamp": 1, "socketId": "123abc" })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.message).to.be.equal("User logged in.")
                    done()
                }
            })
    })

    //negative test case to check message in response
    it('negative test case', (done) => {
        supertest(app).post('/api/chat/checkUserSession')
            .send({ "userName": "testUser", "userId": "123", "updatedAt": "10 Nov 2017", "updatedAt": "3 July 2017", "online": "Y", "timestamp": 1, "socketId": "123abc" })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.message).not.to.be.equal("User logged out")
                    done()
                }
            })
    })

})