process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//Importing third party libraries to test api
let express = require('express')
let expect = require('chai').expect;
let sinon = require('sinon');
let supertest = require('supertest');
//Importing required modules
let app = require('./../bin/www');
let snippetModel = require('./../api/snippets/snippet.entity');
//Importing stubs for different types of requests
let getStub = sinon.stub(snippetModel, 'find');
let modelStubSave = sinon.stub(snippetModel.prototype, 'save');
let putStub = sinon.stub(snippetModel, 'findOneAndUpdate');
let deleteStub = sinon.stub(snippetModel, 'remove');
//Test Suite for snippet
describe('snippet', () => {
    //Providing Stubs for different requests
    beforeEach(() => {
        getStub.yields(null, [{ title: 'Html app', code: 'h1', language: 'html' }])
        modelStubSave.yields(null, [{ title: 'Html app', code: 'h1', language: 'html' }])
        putStub.yields(null, { title: 'Html app', code: 'h1', language: 'html' })
        deleteStub.yields(null, { title: 'html', code: 'h1', language: 'html' })
    });
    //Positive test case to get snippet
    it('positive testcase for getting snippet', (done) => {
        supertest(app)
            .get('/api/snippets')
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) throw err;
                else if (res) {
                    expect(res.body[0].title).to.equal("Html app");
                    expect(res.body[0].code).to.equal("h1");
                    expect(res.body[0].language).to.equal("html");
                    done();
                }
            });
    });
    //Negative test case to get snippet
    it('negative testcase for getting snippet', (done) => {
        supertest(app)
            .get('/api/snippets')
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) throw err;
                else if (res) {
                    expect(res.body.code).to.not.equal("h1");
                    expect(res.body.language).to.not.equal("html");
                    done();
                }
            });
    });
    //Positive test case to add snippet
    it('positive testcase for adding api', (done) => {
        supertest(app)
            .post('/api/snippets')
            .send({ code: "h1" })
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) throw err;
                else if (res) {
                    expect(res.body.code).to.equal("h1");
                    done();
                }
            });
    });
    //Negative test case to add snippet
    it('negative testcase for adding snippet', (done) => {
        supertest(app)
            .post('/api/snippets')
            .send({ code: "h1" })
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) throw err;
                else if (res) {
                    expect(res.body.code).to.not.equal("h");
                    done();
                }
            });
    });
    //positive test case for  put method in snippets  
    it('positive test case for put method of snippets', (done) => {
        supertest(app)
            .put('/api/snippets/update')
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) throw err;
                else if (res) {
                    console.log(res.body)
                    expect(res.body.title).to.equal("Html app");
                    expect(res.body.code).to.equal('h1');
                    expect(res.body.language).to.equal('html');
                    done();
                }
            });
    });
    //negative test case for put method in snippets  
    it(' negative test case for put method of snippets', (done) => {
        supertest(app)
            .put('/api/snippets/update')
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) throw err;
                else if (res) {
                    expect(res.body.title).not.to.equal('Htm app');
                    expect(res.body.code).not.to.equal('h');
                    expect(res.body.language).not.to.equal('language');
                    done();
                }
            });
    });
    //Test Case for deleting snippets
    it('should return status 201 after DELETING a snippets', (done) => {
        supertest(app)
            .delete('/api/snippets/delete/html')
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else if (res) {
                    expect(res.body.title).equal("html")
                    expect(res.body.code).equal("h1")
                    expect(res.body.language).equal("html")
                    done();
                }
            });
    });
    //Negative Test Case for deleting snippets
    it('should not return status 201 after DELETING a snippets', (done) => {
        supertest(app)
            .delete('/api/snippets/delete/html')
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else if (res) {
                    expect(res.body.title).not.to.be.equal("Htl")
                    expect(res.body.code).not.to.be.equal("H")
                    expect(res.body.language).not.to.be.equal("hml")
                    done();
                }
            });
    });
});