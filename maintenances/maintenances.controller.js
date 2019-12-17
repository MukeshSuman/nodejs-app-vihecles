const express = require("express");
const router = express.Router();
const maintenanceService = require("./maintenance.service");
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
  maintenanceService
    .create(req.body)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: {},
          message: "maintenance has been successfully created"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  maintenanceService
    .getAll()
    .then(maintenances => responseHandler(maintenances, req, res, next))
    .catch(err => next(err));
}

function getById(req, res, next) {
  maintenanceService
    .getById(req.params.id)
    .then(maintenance =>
      maintenance ? responseHandler(maintenance, req, res, next) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function update(req, res, next) {
  maintenanceService
    .update(req.params.id, req.body)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: null,
          message: "maintenance has been successfully updated"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  maintenanceService
    .delete(req.params.id)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: null,
          message: "maintenance has been successfully deleted"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}
