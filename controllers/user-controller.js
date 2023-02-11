const user = require("../models/user");

module.exports = {
  // get all users
  getUsers(req, res) {
    user
      .find()
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // get a single user by id
  getSingleUser(req, res) {
    user
      .findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    user
      .create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // update a user
  updateUser(req, res) {
    user
      .findOneAndUpdate({ _id: req.params.userId }, body, {
        new: true,
        runValidators: true,
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete user
  deleteUser(req, res) {
    user
      .findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // add a friend
  addFriend(req, res) {
    user
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete a friend
  deleteFriend(req, res) {
    user
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};
