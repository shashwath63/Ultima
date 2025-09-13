const express = require("express");
const router = express.Router();
const { login, getUsers, getUserById } = require("../controller/auth.controller");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", login);

module.exports = router;