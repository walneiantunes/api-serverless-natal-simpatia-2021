"use strict";
const { query } = require("express");
const express = require("express");
const serverless = require("serverless-http");
const connection = require("./infra/database/connection");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/categories", (req, res) => {
  try {
    const query = "SELECT * FROM category order by category";

    connection.query(query, (err, result) => {
      if (err) {
        const response = { data: null, message: err.message };
        res.send(response);
      }

      const categories = [...result];

      const response = {
        data: categories,
      };

      res.status(200).send(response);
    });
  } catch (err) {
    console.log("ERROR", err.message || err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/stores/:category?", (req, res) => {
  const _where = req.params.category
    ? `WHERE category_id=${req.params.category}`
    : "";

  const query = `SELECT * FROM store ${_where} ORDER BY RAND()`;

  connection.query(query, (err, results, fields) => {
    const stories = [...results];

    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const response = {
      data: stories,
    };

    res.status(200).send(response);
  });
});

module.exports.handler = serverless(app);
