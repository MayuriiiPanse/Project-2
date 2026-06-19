const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/auth.middleware");

const posterController =
require("../controller/posterController");

router.post(
    "/generate",
    authMiddleware,
    posterController.generatePoster
);

router.get(
    "/all",
    authMiddleware,
    posterController.getAllPosters
);

module.exports = router;