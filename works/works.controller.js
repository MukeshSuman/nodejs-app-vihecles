const express = require("express");
const router = express.Router();
const workService = require("./work.service");
const responseHandler = require("_helpers/response-handler");

// routes
router.post("/create", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  req.body["createdBy"] = req.user.sub;
  workService
    .create(req.body)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: {},
          message: "work has been successfully created"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  workService
    .getAll()
    .then(works => responseHandler(works, req, res, next))
    .catch(err => next(err));
}

function getById(req, res, next) {
  workService
    .getById(req.params.id)
    .then(work =>
      work ? responseHandler(work, req, res, next) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function update(req, res, next) {
  workService
    .update(req.params.id, req.body)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: null,
          message: "work has been successfully updated"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  workService
    .delete(req.params.id)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: null,
          message: "work has been successfully deleted"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}
