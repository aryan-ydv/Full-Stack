const express = require("express");
let Exercise = require("../models/exercise.model");
const app = express();

app.get("/", (req, res) => {
  Exercise.find()
    .then((exercise) => {
      res.json(exercise);
    })
    .catch((err) => {
      res.status(400).json("Error", +err);
    });
  //res.json(Exercise);
});

app.post("/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const newExercise = new Exercise({
    name,
    email,
  });
  newExercise
    .save()
    .then(() => {
      res.json("Exercises addded!!");
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Exercise.findById(id)
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/", (req, res) => {
  const id = req.body.id;
  // console.log(id);
  Exercise.findByIdAndDelete(id)
    .then(() => {
      res.json("Data is Deleted!!");
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/update", (req, res) => {
  const id = req.body.id;
  Exercise.findById(id).then((exercise) => {
    exercise.name = req.body.name;
    exercise.email = req.body.email;

    exercise
      .save()
      .then(() => {
        res.json("Exercises updated!!!!");
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

module.exports = app;
