const express = require("express");
const router = express.Router();
const picklistService = require("./picklist.service");
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
  picklistService
    .create(req.body)
    .then((result) =>
      responseHandler(
        {
          code: 200,
          data: result,
          message: "picklist has been successfully created"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  picklistService
    .getAll()
    .then(picklists => responseHandler(picklists, req, res, next))
    .catch(err => next(err));
}

function getById(req, res, next) {
  picklistService
    .getById(req.params.id)
    .then(picklist =>
      picklist ? responseHandler(picklist, req, res, next) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function update(req, res, next) {
  picklistService
    .update(req.params.id, req.body)
    .then((result) =>
      responseHandler(
        {
          code: 200,
          data: result,
          message: "picklist has been successfully updated"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  picklistService
    .delete(req.params.id)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: null,
          message: "picklist has been successfully deleted"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}
