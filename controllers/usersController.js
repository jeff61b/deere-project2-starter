const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;

// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
  UserModel.findByPk(req.params.id).then((userProfile) => {
    res.render("users/profile.ejs", {
      user: userProfile,
    });
  });
});

module.exports = router;

// update the item on the database
router.put("/profile/:id", (req, res) => {
  UserModel.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((user) => {
    res.redirect(`/users/profile/${req.params.id}`);
  });
});

// Delete route for user
router.delete("/:id", (req, res) => {
  UserModel.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect("/");
  });
});
