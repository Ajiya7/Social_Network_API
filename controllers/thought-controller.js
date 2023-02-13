const { thought, user } = require("../models");

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    thought
      .find()
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // get a single thought by id
  getSingleThought(req, res) {
    thought
      .findOne({ _id: req.params.Id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with that ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // creating a thpought
  creatingThought(req, res) {
    thought
      .create(req.body)
      .then(({ _id }) => {
        return user.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // updating a thought
  updatingThought(req, res) {
    thought
      .findOneAndUpdate(
        { _id: req.params.Id },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // deleting a thought
  deletingThought(req, res) {
    thought
      .findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // adding reaction
  addReaction(req, res) {
    thought
      .findOneAndUpdate(
        { _id: req.params.Id },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // deleting reaction
  deleteReaction(req, res) {
    thought
      .findOneAndUpdate(
        { _id: params.Id },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
