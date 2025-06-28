const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .populate("brand");
    console.log(products);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { getFilteredProducts };
