const express = require("express");
const router = express.Router();
const fuelService = require("./fuel.service");
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
  fuelService
    .create(req.body)
    .then((result) =>
      responseHandler(
        {
          code: 200,
          data: result,
          message: "fuel has been successfully created"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  fuelService
    .getAll()
    .then(fuels => responseHandler(fuels, req, res, next))
    .catch(err => next(err));
}

function getById(req, res, next) {
  fuelService
    .getById(req.params.id)
    .then(fuel =>
      fuel ? responseHandler(fuel, req, res, next) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function update(req, res, next) {
  fuelService
    .update(req.params.id, req.body)
    .then((result) =>
      responseHandler(
        {
          code: 200,
          data: result,
          message: "fuel has been successfully updated"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  fuelService
    .delete(req.params.id)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: null,
          message: "fuel has been successfully deleted"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}
