const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const get = () => {
  return 'hello';
};

const register = async (req, res) => {
  await db.users
    .create({
      nama: req.body.nama,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
      const token =
        'Bearer ' +
        jwt.sign(
          {
            id: user.id,
            nama: user.nama
          },
          'covid_app',
          {
            expiresIn: 86400 //24h expired
          }
        );

      return res.status(200).json({
        success: true,
        token: token
      });
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        errors: err
      });
    });
};

const login = async (req, res) => {
  db.users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User Not Found.'
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          success: false,
          message: 'Invalid Password!'
        });
      }

      var token =
        'Bearer ' +
        jwt.sign(
          {
            id: user.id
          },
          'covid_app',
          {
            expiresIn: 86400 //24h expired
          }
        );

      res.status(200).send({
        success: true,
        token: token
      });
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        error: err
      });
    });
};

const getUser = async (req, res) => {
  const users = await db.users.findAll({
    attributes: ['nama', 'email', 'nomorhp', 'daftar_vaksin']
  });
  return res.status(200).json({
    success: true,
    data: users
  });
};

module.exports = {
  register,
  login,
  getUser
};
