const express = require("express");
const { checkAuth } = require("../controllers/checkAuth");
const { publishTopic } = require("../controllers/publishMessage");

const router = express.Router({ mergeParams: true });

router.get("/checkAuth", checkAuth);
router.post("/publish", publishTopic);

module.exports = router;
