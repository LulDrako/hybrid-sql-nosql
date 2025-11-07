const router = require("express").Router();
const ctrl = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const requireRole = require("../middlewares/requireRole");

router.get("/", ctrl.listUsers);
router.get("/:id", ctrl.getUser);
router.post("/", auth, ctrl.createUser);
router.put("/:id", auth, ctrl.updateUser);
router.delete("/:id", auth, requireRole("admin"), ctrl.deleteUser);

module.exports = router;

