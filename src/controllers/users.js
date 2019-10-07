const User = require('../models/user');

exports.create = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  user.save()
    .then(() => {
      const sanitizedUser = user.sanitise();
      res.status(201).json(sanitizedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const EmailError = err.errors.email ? err.errors.email.message : null;
        res.status(400).json({
          errors: {
            email: EmailError,
          },
        });
      } else {
        res.sendStatus(500);
      }
    });
};
