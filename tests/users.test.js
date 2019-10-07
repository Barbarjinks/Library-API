const mongoose = require('mongoose');
const User = require('../src/models/user');

describe('/users', () => {
  beforeEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user in the database', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          firstName: 'Testy',
          lastName: 'Mctesterson',
          email: 'Test@test.com',
          password: 'TestMe',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);

          User.findById(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.firstName).to.equal('Testy');
            expect(user.lastName).to.equal('Mctesterson');
            expect(user.email).to.equal('Test@test.com');
            expect(res.body).not.to.have.property('password');
            done();
          });
        });
    });
    it('API validates email', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          firstName: 'Testy',
          lastName: 'Mctesterson',
          email: 'Testtttttttt',
          password: 'TestMe',
        })
        .end((err, res) => {
          expect(res.body.errors.email).to.equal('Invalid email address');
          expect(res.status).to.equal(400);

          User.countDocuments({}, (error, count) => {
            expect(count).to.equal(0);
          });
          done();
        });
    });
  });
});
