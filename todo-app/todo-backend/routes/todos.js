const express = require("express");
const { Todo } = require("../mongo");
const redis = require("../redis");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  redis
    .getAsync("counter")
    .then((reply) => {
      if (reply) {
        redis.setAsync("counter", Number(reply) + 1);
      } else {
        redis.setAsync("counter", 1);
      }
    })
    .catch((error) => console.log(error));
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  if (req.todo) {
    return res.send(req.todo);
  }
  return res.sendStatus(404); // Implement this
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const body = req.body;
  const updatedTodo = {};

  if (body.text) {
    updatedTodo.text = body.text;
  }
  if (body.done) {
    updatedTodo.done = body.done;
  }
  try {
    const newTodo = await Todo.findByIdAndUpdate(req.todo.id, updatedTodo, {
      new: true,
    });
    res.status(200).json(newTodo);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: error,
    });
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
