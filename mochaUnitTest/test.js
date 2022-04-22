const server = require('../app.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

// check all routes
// /prayertime/:wilaya/
// /prayertime/:wilaya/:year
// /prayertime/:wilaya/:year/:month
// /prayertime/:wilaya/:year/:month/:day
// /prayertime/:wilaya/:year/:month/:day/:eventname

describe('Task APIs', () => {
    describe('/GET prayertime', () => {
        it('it should GET all prayertime', (done) => {
            chai.request(server)
                .get('/prayertime')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/GET prayertime/:wilaya/:year', () => {
        it('it should GET all prayertime', (done) => {
            chai.request(server)
                .get('/prayertime/2022')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/GET prayertime/:wilaya/:year/:month', () => {
        it('it should GET all prayertime', (done) => {
            chai.request(server)
                .get('/prayertime/2020/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/GET prayertime/:wilaya/:year/:month/:day', () => {
        it('it should GET all prayertime', (done) => {
            chai.request(server)
                .get('/prayertime/2022/5/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/GET prayertime/:wilaya/:year/:month/:day/:eventname', () => {
        it('it should GET all prayertime', (done) => {
            chai.request(server)
                .get('/prayertime/1/2020/1/1/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

    })
})

