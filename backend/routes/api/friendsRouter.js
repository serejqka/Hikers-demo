const friendsRouter = require('express').Router();

const { Friend, User } = require('../../db/models');

friendsRouter.get('/profile/friends', async (req, res) => {
  // console.log('friends route');
  try {
    const friends = await Friend.findAll({ include: { model: User }, raw: true });
    // const subscribers = await User.findAll({ include: { model: Friend }, raw: true });
    const users = await User.findAll({ raw: true });
    // console.log(friends, 'friends route');
    // console.log(subscribers, 'route');
    res.json({ friends, users });
  } catch (error) {
    res.status(404).json(error);
  }
});

friendsRouter.post('/profile/friends/unsubscribe', async (req, res) => {
  const { userId, friendId } = req.body;
  console.log(userId, friendId);
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
      const users = await User.findAll({ raw: true });
      res.json({ friends, users });
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
      const users = await User.findAll({ raw: true });
      res.json({ friends, users });
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
      const users = await User.findAll({ raw: true });
      res.json({ friends, users });
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = friendsRouter;
