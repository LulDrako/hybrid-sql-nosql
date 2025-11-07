const router = require("express").Router();
const ctrl = require("../controllers/profile.controller");
const auth = require("../middlewares/auth");

router.get("/:userId", auth, ctrl.getProfile);
router.post("/", auth, ctrl.createProfile);
router.put("/:userId", auth, ctrl.updateProfile);

module.exports = router;

