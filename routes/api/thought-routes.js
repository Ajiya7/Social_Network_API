const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:Id
router.route("/:Id").get(getSingleThought);

module.exports = router;
