const express = require("express");
const {
  fetchAllBrands,
  addBrand,
  editBrand,
  deleteBrand,
} = require("../../controllers/admin/brand-controller");

const router = express.Router();

router.get("/get", fetchAllBrands);
router.post("/add", addBrand);
router.put("/edit/:id", editBrand);
router.delete("/delete/:id", deleteBrand);

module.exports = router;
