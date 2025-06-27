const express = require("express");
const {
  fetchAllCategories,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../../controllers/admin/category-controller");

const router = express.Router();

router.get("/get", fetchAllCategories);
router.post("/add", addCategory);
router.put("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
