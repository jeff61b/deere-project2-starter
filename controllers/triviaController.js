const express = require("express");
const category = require("../models/category");
const router = express.Router();
const User = require("../models").User;
const Category = require("../models").Category;
const TriviaModel = require("../models").TriviaQuestions;

// New route - send empty form
router.get("/new", (req, res) => {
  Category.findAll().then((allCategories) => {
    res.render("new.ejs", {
      categories: allCategories,
    });
  });
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

// SHOW ROUTE - GET ONE Trivia Question
router.get("/:id", function (req, res) {
  TriviaModel.findByPk(req.params.id).then((foundQuestion) => {
    Category.findByPk(foundQuestion.categoryId).then((allCategories) => {
      //console.log(allCategories);
      console.log("New show route");
      //console.log(foundQuestion);
      console.log(foundQuestion.categoryId);
      console.log(allCategories.name);
      res.render("show.ejs", {
        trivia: foundQuestion,
        categories: allCategories,
      });
    });
  });
});

// // SHOW ROUTE - GET ONE Trivia Question
// router.get("/:id", function (req, res) {
//   TriviaModel.findByPk(req.params.id).then((foundQuestion) => {
//     Category.findAll().then((allCategories) => {
//       //console.log(allCategories);
//       console.log("New show route");
//       console.log(foundQuestion);
//       //console.log(trivia.categoryId);
//       res.render("show.ejs", {
//         trivia: foundQuestion,
//         categories: allCategories,
//       });
//     });
//   });
// });

// router.get("/:id", (req, res) => {
//   console.log("show route");
//   TriviaModel.findByPk(req.params.id, {
//     include: [
//       {
//         model: Category,
//       },
//     ],
//     attributes: [
//       "id",
//       "question",
//       "answer1",
//       "answer2",
//       "answer3",
//       "answer4",
//       "correctAnswer",
//       "categoryId",
//     ],
//   }).then((trivia) => {
//     console.log("render show form");
//     console.log(trivia.name);

//     res.render("show.ejs", {
//       trivia: trivia,
//     });
//   });
// });

// Edit
router.get("/:id/edit", function (req, res) {
  TriviaModel.findByPk(req.params.id).then((foundQuestion) => {
    Category.findAll().then((allCategories) => {
      console.log(allCategories);
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
    //  Category.findByPk(req.body.categoryId).then((foundCategory) => {
    //    TriviaModel.findByPk(req.params.id).then((foundQuestion) => {
    //      foundQuestion.addCategory(foundCategory);
    res.redirect("/trivia");
  });
  //  });
  //});
});

router.delete("/:id", (req, res) => {
  TriviaModel.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect("/trivia");
  });
});

module.exports = router;
