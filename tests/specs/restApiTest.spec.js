'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

const serverURL = "http://localhost:8000";

chai.use(chaiHttp);

/* Test the /GET route */
describe('Test Rest Api', () => {
    describe('/GET Hello World', () => {
        it('it should GET string: "Hello World!!!!"', (done) => {
            chai.request(serverURL)
                .get('/api/helloworld')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.be.eql('Hello World!!!!');
                    done();
                });
        });
    });
});