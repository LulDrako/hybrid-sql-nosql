const router = require("express").Router();
const ctrl = require("../controllers/profile.controller");

router.get("/:userId", ctrl.getProfile);
router.post("/", ctrl.createProfile);
router.put("/:userId", ctrl.updateProfile);

module.exports = router;

