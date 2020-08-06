const express = require("express");
const category = require("../models/category");
const router = express.Router();
const CategoryModel = require("../models").Category;
//const TriviaModel = require("../models").TriviaQuestions;

// index route
router.get("/", (req, res) => {
  CategoryModel.findAll().then((categoryAll) => {
    res.render("categories/index.ejs", {
      category: categoryAll,
    });
  });
});

// New route - send empty form
router.get("/categories", (req, res) => {
  Category.findAll().then((allCategories) => {
    console.log("New Route");
    res.render("categories/new.ejs", {
      categories: allCategories,
    });
  });
});

// Add New Category
router.post("/", (req, res) => {
  CategoriesModel.create(req.body).then((newCategory) => {
    console.log("new" + newCategory);
    res.redirect("/categories");
  });
});

// SHOW ROUTE - GET ONE Category
router.get("/:id", function (req, res) {
  CategoryModel.findByPk(req.params.id).then((foundCategory) => {
    console.log("New show route");
    console.log(foundCategory.id);
    res.render("categories/edit.ejs", {
      category: foundCategory,
    });
  });
});

// Edit
router.get("/:id/edit", function (req, res) {
  CategoryModel.findByPk(req.params.id).then((foundCategory) => {
    res.render("edit.ejs", {
      category: foundCategory,
    });
  });
});

// Perform the actual update of the data in the table
router.put("/:id", (req, res) => {
  CategoryModel.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((category) => {
    console.log("Update record");
    console.log(req.body);
    res.redirect("/");
  });
});

router.delete("/:id", (req, res) => {
  CategoryModel.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect("/categories");
  });
});

module.exports = router;
