const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Category = require("../models").Category;
const TriviaModel = require("../models").TriviaQuestions;

// New route - send empty form
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// index route
router.get("/", (req, res) => {
  TriviaModel.findAll().then((triviaAll) => {
    res.render("index.ejs", {
      trivia: triviaAll,
    });
  });
});

// Add New Trivia Question
router.post("/", (req, res) => {
  TriviaModel.create(req.body).then((newQuestion) => {
    console.log("new" + newQuestion);
    res.redirect("/trivia");
  });
});

// Add New Trivia Question
// router.post("/", (req, res) => {
//   TriviaModel.create(req.body).then((newQuestion) => {
//     console.log("new" + newQuestion);
//     res.redirect("/");
//   });
// });

// SHOW ROUTE - GET ONE Trivia Question
router.get("/:id", (req, res) => {
  TriviaModel.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Category,
      },
    ],
    attributes: [
      "question",
      "answer1",
      "answer2",
      "answer3",
      "answer4",
      "correctAnswer",
      "categoryId",
    ],
  }).then((trivia) => {
    res.render("show.ejs", {
      trivia: trivia,
    });
  });
});

// Edit
router.get("/:id/edit", function (req, res) {
  TriviaModel.findByPk(req.params.id).then((foundQuestion) => {
    Category.findAll().then((allCategories) => {
      res.render("edit.ejs", {
        trivia: foundQuestion,
        categories: allCategories,
      });
    });
  });
});

// Update - I'm thinking this is not needed.
// It's just a duplicate of the edit route above.

// router.get("/:id/edit", function (req, res) {
//   TriviaModel.findByPk(req.params.id).then((foundQuestion) => {
//     res.render("edit.ejs", {
//       trivia: foundQuestion,
//     });
//   });
// });

// Perform the actual update of the data in the array
router.put("/:id", (req, res) => {
  console.log(req.body);

  TriviaModel.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((updatedTrivia) => {
    Category.findByPk(req.body.category).then((foundCategory) => {
      TriviaModel.findByPk(req.params.id).then((foundQuestion) => {
        foundQuestion.addCategory(foundCategory);
        res.redirect("/");
      });
    });
  });
});

router.delete("/:id", (req, res) => {
  TriviaModel.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect("/trivia");
  });
});

module.exports = router;