const User = require('../src/models/user');
const UserHelpers = require('../tests/helpers/user-helpers');

describe('/users', () => {
  beforeEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user in the database', (done) => {
      UserHelpers.signUp({
        firstName: 'Testy',
        lastName: 'Mctesterson',
        email: 'Test@test.com',
        password: 'TestMeeee',
      })
        .then((res) => {
          expect(res.status).to.equal(201);

          User.findById(res.body._id, (err, user) => {
            expect(user.firstName).to.equal('Testy');
            expect(user.lastName).to.equal('Mctesterson');
            expect(user.email).to.equal('Test@test.com');
            expect(res.body).not.to.have.property('password');
            done();
          })
            .catch((err) => done(err));
        });
    });
    it('API validates email', (done) => {
      UserHelpers.signUp({
        firstName: 'Testy',
        lastName: 'Mctesterson',
        email: 'Testtttttttt',
        password: 'TestMe',
      })
        .then((res) => {
          expect(res.body.errors.email).to.equal('Invalid email address');
          expect(res.status).to.equal(400);

          User.countDocuments({}, (error, count) => {
            expect(count).to.equal(0);
          });
          done();
        })
        .catch((err) => done(err));
    });
  });
});
