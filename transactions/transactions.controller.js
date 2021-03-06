﻿const express = require("express");
const router = express.Router();
const transactionService = require("./transaction.service");
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
  transactionService
    .create(req.body)
    .then((result) =>
      responseHandler(
        {
          code: 200,
          data: result,
          message: "transaction has been successfully created"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  transactionService
    .getAll()
    .then(transactions => responseHandler(transactions, req, res, next))
    .catch(err => next(err));
}

function getById(req, res, next) {
  transactionService
    .getById(req.params.id)
    .then(transaction =>
      transaction ? responseHandler(transaction, req, res, next) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function update(req, res, next) {
  transactionService
    .update(req.params.id, req.body)
    .then((result) =>
      responseHandler(
        {
          code: 200,
          data: result,
          message: "transaction has been successfully updated"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  transactionService
    .delete(req.params.id)
    .then(() =>
      responseHandler(
        {
          code: 200,
          data: null,
          message: "transaction has been successfully deleted"
        },
        req,
        res,
        next
      )
    )
    .catch(err => next(err));
}
