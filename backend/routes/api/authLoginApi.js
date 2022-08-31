const authLoginApi = require('express').Router();
const bcrypt = require('bcrypt');
const e = require('express');

const { User } = require('../../db/models');

authLoginApi.post('/auth', async (req, res) => {
  res.json({ session: req.session.user });
});

authLoginApi.post('/login', async (req, res) => {
  const { email, password } = req.body.form;
  const findUserInDB = await User.findOne({ raw: true, where: { email } });

  if (findUserInDB) {
    if (findUserInDB && (await bcrypt.compare(password, findUserInDB.password))) {
      req.session.user = findUserInDB;
      res.json({ auth: true, session: findUserInDB });
    } else {
      res.json({ auth: false, text: 'Неправильно ввели пароль' });
    }
  } else {
    res.json({ auth: false, text: 'Такой учетной записи не существует' });
  }
});

authLoginApi.post('/registration', async (req, res) => {
  const {
    login, email, password, password2,
  } = req.body.form;

  const findUserInDB = await User.findOne({ raw: true, where: { email } });

  if (!findUserInDB) {
    if (password.length > 7) {
      if (password === password2) {
        const newUser = await User.create({
          user_name: login,
          admin: false,
          email,
          password: await bcrypt.hash(password, 10),
          image: 'https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png',
        });

        req.session.user = newUser;

        res.json({
          registration: true,
          registrationAuth: true,
          registrationLength: true,
          session: newUser,
        });
      } else {
        res.json({
          registration: true,
          registrationAuth: true,
          registrationLength: false,
          text: 'Пароли не совпадают',
        });
      }
    } else {
      res.json({ registration: true, registrationLength: true, text: 'Длина пароля не менее 8 символов' });
    }
  } else {
    res.json({ registration: false, text: 'Такой пользователь уже существует' });
  }
});

authLoginApi.post('/logout', (req, res) => {
  req.session.destroy();
  res
    .clearCookie('user_sid')
    .json({ logout: true });
});

module.exports = authLoginApi;
