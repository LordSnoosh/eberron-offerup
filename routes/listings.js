const express = require("express");
const router = express.Router();
const listingsCtrl = require("../controllers/listings");
const isLoggedIn = require("../config/auth");

router.get("/", listingsCtrl.index);
router.get("/new", isLoggedIn, listingsCtrl.new);
router.get("/:id", listingsCtrl.show);
router.delete("/:id", isLoggedIn, listingsCtrl.delete);
router.post("/", isLoggedIn, listingsCtrl.create);

module.exports = router;
