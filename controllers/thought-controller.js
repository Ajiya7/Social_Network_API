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
};
