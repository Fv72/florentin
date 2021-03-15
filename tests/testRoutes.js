// DB
const mongoose = require('mongoose');
const Realisation = require('../api/models/Realisation')

// Config Chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = chai.expect;
const app = require('../app');
const path = require('path')

chai.use(chaiHttp)

describe('CHAI // CONTROLLER //  ArticleController', () => {

    // beforeEach((done) => {
    //     Realisation.deleteOne({}, (err) => {
    //         done();
    //     });
    // });

    it(' ChaiRouter // Get Article', (done) => {
        chai.request(app)
            .get('/realisation')
            .set('Accept', 'application/json')
            // .expect(200)
            .end((err, res) => {
                // console.log(res)
                if (err) return done(err)
                res.should.have.status(200);
                res.should.be.a('object');
                done();
            });
    });

    it(' ChaiRouter // Post Article', (done) => {
        // Simulation de notre formulaire (req.body)
        let realisation = {
            title: 'test Chai Post'
        }

        chai.request(app)
            .post("/realisation")
            .send(realisation)
            .end(function(err, res) {
                if (err) {
                    don(err);
                }
                expect(res.status).to.equal(200);
                done()
            });
    });

    it(' ChaiRouter // Put Article', (done) => {
        let realisation = new Realisation({
                title: 'test Chai Edit'
            }),
            articleEdit = { title: 'test Chai Edit 2' }

        realisation.save()
        chai.request(app)
            .put('/realisation/' + realisation._id)
            .send(articleEdit)
            .end((err, res) => {
                res.should.be.a('object');
                done();
            });
    });

    it(' ChaiRouter // Delete Article', (done) => {
        let realisation = new Realisation({
            title: 'test Chai Edit'
        })

        chai.request(app)
            .delete('/realisation/' + realisation._id)
            .end((err, res) => {
                res.should.be.a('object');
                done();
            });
    });


});