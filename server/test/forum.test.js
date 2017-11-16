//Providing Testing Environment
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//Importing third party libraries to test api
let supertest = require('supertest')
let expect = require('chai').expect;
let sinon = require('sinon')
//Importing required modules
var app = require('../bin/www');
let model = require("../api/forums/forum.entity");
//Importing stubs for different types of requests
let modelStub = sinon.stub(model, 'find');
let modelStubSave = sinon.stub(model.prototype, 'save');
let modelStubFindOne = sinon.stub(model, 'findOne');
let modelStubUpdate = sinon.stub(model, 'update');
//Test Suite for Forum//
describe("Testing Employee", () => {
    //Providing Stubs for different requests
    beforeEach(() => {
        modelStubSave.yields(null, { username: "Prakhar", questionTitle: "What?", problemDescription: "Not Working", date: "9/11/2017",
        time: "10:34AM", votes: 45, codeSnippet: "import * from '@angular/core'", tags: "Angular" });
        modelStub.yields(null, { username: "Prakhar", questionTitle: "What?", problemDescription: "Not Working", date: "9/11/2017",
        time: "10:34AM", votes: 45, codeSnippet: "import * from '@angular/core'", tags: "Angular" });
        modelStubFindOne.yields(null, { username: "Prakhar", questionTitle: "What?", problemDescription: "Not Working", date: "9/11/2017",
        time: "10:34AM", votes: 45, codeSnippet: "import * from '@angular/core'", tags: "Angular" });
        modelStubUpdate.yields(null, { username: "Prakhar", questionTitle: "What?", problemDescription: "Not Working", date: "9/11/2017",
        time: "10:34AM", votes: 45, codeSnippet: "import * from '@angular/core'", tags: "Angular" });
    })

    //---Positive Test Cases---//
    //Test Case for getting all posts in the forum
    it('getting forum posts', (done) => {
        supertest(app)
            .get('/api/forums')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.equal("Prakhar");
                done();
            });
    });
    //Test Case for searching posts in the forum
    it('getting search results', (done) => {
        supertest(app)
            .get('/api/forums/term/abc')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.equal("Prakhar");
                done();
            });
    });
    //Test Case for getting posts by id in the forum
    it('getting forum post by id', (done) => {
        supertest(app)
            .get('/api/forums/56')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.equal("Prakhar");
                done();
            });
    });
    //Test Case for saving answers in the forum
    it('saving answer to a forum post', (done) => {
        supertest(app)
            .put('/api/forums/23')
            .send({username: "Sunil"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.equal("Prakhar");
                done();
            });
    });
    //Test Case for adding like to a post in the forum
    it('adding like to a forum post', (done) => {
        supertest(app)
            .put('/api/forums/like/56')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.equal("Prakhar");
                done();
            });
    });

    //Test Case for adding dislike to a post in the forum
    //---Negative Test Cases---//
    //Test Case for adding new posts in the forum
    it('adding forum posts', (done) => {
        supertest(app)
            .post('/api/forums')
            .send({ username: "Sunil" })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.not.equal("Prakhar");
                done();
            });
    });
    //Test Case for getting all posts in the forum
    it('getting forum posts', (done) => {
        supertest(app)
            .get('/api/forums')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.not.equal("Sunil");
                done();
            });
    });
    //Test Case for searching posts in the forum
    it('getting search results', (done) => {
        supertest(app)
            .get('/api/forums/term/abc')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.not.equal("Sunil");
                done();
            });
    });
    //Test Case for getting posts by id in the forum
    it('getting forum post by id', (done) => {
        supertest(app)
            .get('/api/forums/56')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.not.equal("Sunil");
                done();
            });
    });
    //Test Case for saving answers in the forum
    it('saving answer to a forum post', (done) => {
        supertest(app)
            .put('/api/forums/23')
            .send({username: "Sunil"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.not.equal("Sunil");
                done();
            });
    });
    //Test Case for adding like to a post in the forum
    it('adding like to a forum post', (done) => {
        supertest(app)
            .put('/api/forums/like/56')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.not.equal("Sunil");
                done();
            });
    });
    //Test Case for adding dislike to a post in the forum
    it('adding dislike to a forum post', (done) => {
        supertest(app)
            .put('/api/forums/dislike/56')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.data.username).to.not.equal("Sunil");
                done();
            });
    });
});