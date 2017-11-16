process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// let mongoose = require("mongoose");
let loginModel = require('./../api/login/login.entity');
let supertest = require('supertest');
let sinon = require('sinon');
let app = require('./../bin/www');
let expect = require('chai').expect
// let server = supertest.agent('https://localhost/8080')
let loginStub = sinon.stub(loginModel, 'findOne');
let updateStub = sinon.stub(loginModel, 'update');
describe('login /GET ', () => {
    it('respond with json', (done) => {
        loginStub.yields(null, { 'userName': "Yash", 'userId': "123", 'online': "Y" });
        supertest(app)
            .get('/api/login/123')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    // res.body.should.be.instanceof(Array);
                    expect(res.body.data.userName).to.deep.equal('Yash')
                    done();
                }
            });
    })
    it('respond with json', (done) => {
        loginStub.yields(null, { 'userName': "Yash", 'userId': "123", 'online': "Y" });
        supertest(app)
            .get('/api/login/123')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                console.log('asasas')
                if (err) {
                    return done(err)
                } else if (res) {
                    // res.body.should.be.instanceof(Array);
                    expect(res.body.data.userId).to.deep.equal('123')
                    done();
                }
            });
    })
    it('respond with json', (done) => {
        loginStub.yields(null, { 'userName': "Yash", 'userId': "123", 'online': "Y" });
        supertest(app)
            .get('/api/login/123')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                console.log('asasas')
                if (err) {
                    return done(err)
                } else if (res) {
                    // res.body.should.be.instanceof(Array);
                    expect(res.body.data.online).to.deep.equal('Y')
                    done();
                }
            });
    })
});
describe('put', () => {
    beforeEach(() => {
        updateStub.withArgs({ 'userId': "123" }, { $set: { 'online': "Y" } })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            });
    });
    it('respond with json', (done) => {
        supertest(app)
            .put('/api/login/logout')
            .send({ 'userId': "123" })
            .end((err, res) => {
                if (err) return done(err);
                else {
                    expect(res.body.status).to.be.equal(200);
                    done();
                }
            });
    });
    it('negative test cases', (done) => {
        supertest(app)
            .put('/api/login/logout')
            .send({ 'userId': "" })
            .end((err, res) => {
                if (err) return done(err);
                else {
                    expect(res.body.status).to.be.equal(404);
                    done();
                }
            });
    });
    it('respond with json message', (done) => {
        supertest(app)
            .put('/api/login/logout')
            .send({ 'userId': "123" })
            .end((err, res) => {
                if (err) { return done(err); } else {
                    expect(res.body.message).to.be.equal('logout successfully');
                    done();
                }
            });
    })
    it('negative test cases for userId', (done) => {
        supertest(app)
            .put('/api/login/logout')
            .send({ 'userId': "" })
            .end((err, res) => {
                if (err) { return done(err); } else {
                    expect(res.body.message).to.be.equal('userId not found');
                    done();
                }
            });
    });
});

module.exports = loginStub;