const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  User.findAll({ where: { email: req.body.email } })
    .then(([userDocument]) => {
      const user = userDocument.get() 

      if (bcrypt.compareSync(req.body.password, user.password)){
        const { password, ...payload } = user;

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1w' },
          (_, token) => {
            res.status(200).json({ token });
          }
        );
      } else {
        res.status(401).json({ errors: [ "incorrect username or password" ] })
      }
    }).catch(error => {
      res.status(500).json({ error })
    })

}