let supertest = require('supertest');
let chai = require('chai');
let sinon = require('sinon');
let url = 'https://localhost:4200'; //application running port
let app = require('./../app/app');
const forumModel = require('./../api/forums/forum.entity');
let forumGetStub = sinon.stub(forumModel, 'find');


describe('test fetch data of locationchange access card', () => {
    before(() => {
        forumGetStub.yields(null, {
            questionTitle: 'Employee',
            problemDescription: 'temp',
            codeSnippet: '50042924',
            tags: 'temp',
            date: '21/11/2017'
        });
    });
    //positive test case for fetch location change record    
    it('positive case for getting data from forum', (done) => {
        supertest(url)
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.data.category).to.equal('Employee');
                done();
            });
    });

    //negative test case for fetch location change record  
    it('validation for negative case of locationchange access type', (done) => {
        supertest(url)
            .get('/locationchange/findlocation')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.data.category).not.to.equal('Emp');
                done();
            });
    });
});