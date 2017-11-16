// import external modules
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let app = require('./../bin/www');
const userModel = require('./../api/users/users.entity');
const expect = require('chai').expect
const supertest = require('supertest')
const sinon = require('sinon');
const userGetStub = sinon.stub(userModel, 'findOne');
const userUpdateStub = sinon.stub(userModel, 'update');

// test suite for get method
describe('test cases for user profile for get method', () => {
    // stubbing response
    beforeEach(function() {
        userGetStub.yields(null, {
            "name": "Shivani-96",
            "userId": "123",
            "updatedAt": "8 Nov 2017",
            "avatarUrl": "https://192.168.252.148:8080/image.jpg",
            "publicRepos": "7",
            "firstName": "Shivani",
            "lastName": "Sah",
            "email": "shivanisah96@gmail.com",
            "company": "NTL",
            "website": "www.onlinepeerlearning.com",
            "gender": "Female",
            "bio": "Mean stack developer",
            "accessToken": "12345678abc90"
        })
    })

    afterEach(function() {
        userGetStub.restore()
    })


    // positive test case to get user details on login
    it('positive test case---find user on login', function(done) {
        supertest(app).get('/api/users/123')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.data.name).to.be.equal('Shivani-96')
                    expect(res.body.data.userId).to.be.equal('123')
                    expect(res.body.data.updatedAt).to.be.equal('8 Nov 2017')
                    expect(res.body.data.avatarUrl).to.be.equal('https://192.168.252.148:8080/image.jpg')
                    expect(res.body.data.publicRepos).to.be.equal('7')
                    expect(res.body.data.firstName).to.be.equal('Shivani')
                    expect(res.body.data.lastName).to.be.equal('Sah')
                    expect(res.body.data.email).to.be.equal('shivanisah96@gmail.com')
                    expect(res.body.data.company).to.be.equal('NTL')
                    expect(res.body.data.website).to.be.equal('www.onlinepeerlearning.com')
                    expect(res.body.data.gender).to.be.equal('Female')
                    expect(res.body.data.bio).to.be.equal('Mean stack developer')
                    expect(res.body.data.accessToken).to.be.equal('12345678abc90')
                    done();
                }
            })
    })
    // negative test case to get user details on login
    it('negative test case---find user on login', function(done) {
        supertest(app).get('/api/users/123')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.data.name).not.to.be.equal('Shivani1')
                    expect(res.body.data.userId).not.to.be.equal('1234')
                    expect(res.body.data.updatedAt).not.to.be.equal('9 Nov 2017')
                    expect(res.body.data.avatarUrl).not.to.be.equal('https://192.168.252.148:8080/image123.jpg')
                    expect(res.body.data.publicRepos).not.to.be.equal('17')
                    expect(res.body.data.firstName).not.to.be.equal('Shivani1')
                    expect(res.body.data.lastName).not.to.be.equal('Sah1')
                    expect(res.body.data.email).not.to.be.equal('sah96@gmail.com')
                    expect(res.body.data.company).not.to.be.equal('NTL123')
                    expect(res.body.data.website).not.to.be.equal('onlinepeerlearning.com')
                    expect(res.body.data.gender).not.to.be.equal('Male')
                    expect(res.body.data.bio).not.to.be.equal('Mean')
                    expect(res.body.data.accessToken).not.to.be.equal('123dfgd889')
                    done();
                }
            })
    })

})

// test suite for put method
describe('testing update method---user profileInfo', () => {
    beforeEach(() => {
        userUpdateStub.withArgs({ 'userId': '123' }, { $set: { 'name': 'SHIVANISAH' } })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            })
    })
    // positive test case to check response on updating user details
    it('positive test case----testing value of ok field returned in response', (done) => {
        supertest(app)
            .put('/api/users/profileInfo/123')
            .send({ 'userId': "123" })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    expect(res.body.data.ok).to.be.equal(1);
                    expect(res.body.data.n).to.be.equal(1);
                    done();
                }
            });
    });
    // negative test case to check response on updating user details
    it('negative test case----testing value of ok field returned in response', (done) => {
        supertest(app)
            .put('/api/users/profileInfo/123')
            .send({ 'userId': "123" })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    expect(res.body.data.ok).not.to.be.equal(2);
                    expect(res.body.data.n).not.to.be.equal(2);
                    done();
                }
            });
    });
})

// test suite for testing token routes
describe('testing update method----token', () => {
    beforeEach(() => {
        userUpdateStub.withArgs({ 'userId': '123' }, { $set: { 'accessToken': 'ifeugfi42289232vdv' } })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            })
    })

    // positive test case to response on updating token
    it('positive test case----testing status returned in response', (done) => {
        supertest(app)
            .put('/api/users/token/123')
            .send({ 'accessToken': 'ifeugfi42289232vdv' })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.status).to.be.equal(201)
                    done()
                }
            })
    })

    // negative test case to response on updating token
    it('negative test case----testing status returned in response', (done) => {
        supertest(app)
            .put('/api/users/token/123')
            .send({ 'accessToken': 'ifeugfi42289232vdv' })
            .end((err, res) => {
                if (err) {
                    return done(err)
                } else if (res) {
                    expect(res.body.status).not.to.be.equal(200)
                    done()
                }
            })
    })
})