const router = require("express").Router();
const ctrl = require("../controllers/book.controller");
const auth = require("../middlewares/auth");
const requireRole = require("../middlewares/requireRole");

router.get("/", ctrl.listBooks);
router.get("/:id", ctrl.getBook);
router.post("/", auth, requireRole("admin"), ctrl.createBook);
router.put("/:id", auth, requireRole("admin"), ctrl.updateBook);
router.delete("/:id", auth, requireRole("admin"), ctrl.deleteBook);

module.exports = router;

