const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  creatingThought,
  updatingThought,
  deletingThought,
  addReaction,
  deleteReaction
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:Id
router.route("/:Id").get(getSingleThought).put(updatingThought).delete(deletingThought); ;


// /api/thoughts/:userId
router.route('/:userId').post(creatingThought);

// /api/thoughts/:Id/reactions
router.route('/:Id/reactions').post(addReaction);

// /api/thoughts/:Id/:reactionId
router.route('/:Id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
