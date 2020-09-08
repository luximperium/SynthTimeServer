require("dotenv").config();

const express = require("express");
const router = express.Router();

const Users = require("../db").import("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Practice route for testing
router.get("/practice", function (req, res) {
  res.send("Hey!! This is a user practice route!");
});

router.get("/:username", function (req, res) {
  let username = req.params.username;
  Users.findAll({
    where: { username: username },
  })
    .then((username) => res.status(200).json(username))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/myprofile/me", function (req, res) {
  Users.findByPk(jwt.decode(req.headers.authorization).id)
    .then((userinfo) => {
      res.status(200).json(userinfo);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//Register User Route
router.post("/register", function (req, res) {
  Users.create({
    email: req.body.user.email,
    username: req.body.user.username,
    password: bcrypt.hashSync(req.body.user.password, 13),
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    isAdmin: false,
    exists: true,
  })
    .then(function createSuccess(users) {
      let token = jwt.sign({ id: users.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({
        users: users,
        message: "User successfully created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/updateprofile/bio", function (req, res) {
  const updateBio = {
    biography: req.body.user.biography,
  };

  const query = { where: { id: jwt.decode(req.body.user.sessiontoken).id } };

  Users.update(updateBio, query)
    .then((bio) =>
      res
        .status(200)
        .json({ bio: bio, message: "Profile Bio Successfully Updated!" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/updateprofile/pic", function (req, res) {
  const updateprofilePicSrc = {
    profilePicSrc: req.body.user.profilePicSrc,
  };

  const query = { where: { id: jwt.decode(req.body.user.sessiontoken).id } };

  Users.update(updateprofilePicSrc, query)
    .then((profilePicSrc) => {
      res
        .status(200)
        .json({
          profilePicSrc: profilePicSrc,
          message: "Profile Picture Successfully Updated!",
        });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//Login User Route
router.post("/login", function (req, res) {
  Users.findOne({
    where: {
      username: req.body.users.username,
    },
  })
    .then(function loginSuccess(users) {
      if (users) {
        bcrypt.compare(req.body.users.password, users.password, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: users.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });

            res
              .status(200)
              .json({
                users: users,
                message: "User successfully logged in!",
                sessionToken: token,
              });
          } else {
            res.status(502).send({ error: "User does not exist." });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/updateprofile/delete", function (req, res) {
  const query = { where: { id: jwt.decode(req.headers.authorization).id } };
  Users.destroy(query)
    .then(() => res.status(200).json({ message: "Account Deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", function (req, res) {
  const query = { where: { id: req.params.id } };
  Users.destroy(query)
    .then(() => res.status(200).json({ message: "Account Deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/allusers/allusers", function (req, res) {
  Users.findAll({
    where: { exists: true },
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/allusers/:makeadmin", function (req, res) {
  const updateprofilePicSrc = {
    isAdmin: req.body.user.isAdmin
  };

  const query = { where: { id: req.params.makeadmin } };

  Users.update(updateprofilePicSrc, query)
    .then((info) => {
      res
        .status(200)
        .json({
          info: info,
          message: "Admin Status Changed Successfully!",
        });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
