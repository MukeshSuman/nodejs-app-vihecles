const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const responseHandler = require("_helpers/response-handler");

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? responseHandler(user, req, res, next)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => responseHandler(users, req, res, next))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then(user =>
      user ? responseHandler(user, req, res, next) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then(user =>
      user ? responseHandler(user, req, res, next) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: null,
          message: "user has been successfully updated"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: null,
          message: "user has been successfully deleted"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}
