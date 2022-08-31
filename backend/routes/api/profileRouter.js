const router = require('express').Router();
const storageProfileUpload = require('../../middleware/storageProfileUpload');

const { User, Friend } = require('../../db/models');

// получение данных пользователя

router.post('/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      raw: true,
    });
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

// обновление данных пользователя

router.put('/profile', async (req, res) => {
  const {
    id, name, email, city, favorite, link,
  } = req.body.form;
  const updatedUser = await User.update(
    {
      user_name: name,
      email,
      city,
      favorite_cat: favorite,
      link,
    },
    {
      where: { id },
      returning: true,
      raw: true,
    },
  );
  const [, [user]] = updatedUser;
  req.session.user = user;
  res.json(updatedUser[1][0]);
});

// получение ID списка всех подписок/подписчиков

router.get('/profile/subscribe', async (req, res) => {
  try {
    const subscribers = await Friend.findAll({ raw: true });
    res.json(subscribers);
  } catch (error) {
    res.status(404).json(error);
  }
});

// подписка

router.post('/profile', async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const subscribe = await Friend.findOne({
      where: {
        user_id: userId,
        friend_id: friendId,
      },
      raw: true,
    });

    if (!subscribe) {
      await Friend.create({
        user_id: userId,
        friend_id: friendId,
      });
      const friends = await Friend.findAll({ raw: true });
      return res.json(friends);
    }
    if (subscribe.status) {
      await Friend.update(
        { status: false },
        {
          where: {
            user_id: userId,
            friend_id: friendId,
          },
        },
      );
      const friends = await Friend.findAll();
      res.json(friends);
    } else {
      await Friend.update(
        { status: true },
        {
          where: {
            user_id: userId,
            friend_id: friendId,
          },
        },
      );
      const friends = await Friend.findAll();
      res.json(friends);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

// обновление фото user'a

router.put('/profile/photo', async (req, res) => {
  const photos = req.files.profileImg;
  const { id } = req.session.user;
  const url = await Promise.all(await storageProfileUpload(photos));
  const updatedUser = await User.update(
    {
      ava: url.join(''),
    },
    {
      where: { id },
      returning: true,
      raw: true,
    },
  );
  const [, [user]] = updatedUser;
  req.session.user = user;
  res.json(updatedUser[1][0]);
});

module.exports = router;
