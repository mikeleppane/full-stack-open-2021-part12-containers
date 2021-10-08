const express = require("express");
const router = express.Router();
const redis = require("../redis");
const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  redis.getAsync("counter").then((reply) => {
    res.send({
      added_todos: Number(reply),
    });
  });
});

module.exports = router;
