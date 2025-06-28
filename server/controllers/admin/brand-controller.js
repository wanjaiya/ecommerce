const brandModel = require("../../models/Brand");

//fetch all Brands
const fetchAllBrands = async (req, res) => {
  try {
    const Brands = await brandModel.find({ published: true });

    res.status(200).json({
      success: true,
      data: Brands,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

// Add Brand
const addBrand = async (req, res) => {
  try {
    const { title } = req.body;
    //Check if Brand exists

    const newBrand = new brandModel({
      title,
      published: true,
    });

    await newBrand.save();

    res.status(200).json({
      success: true,
      message: "Brand saved",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

const editBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const Brand = await brandModel.findByIdAndUpdate(
      id,
      { title: title },
      {
        new: true,
      }
    );
    if (!Brand) {
      res.status(400).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const Brand = await brandModel.findByIdAndDelete(id);

    if (!Brand) {
      res.status(400).json({
        success: false,
        message: "Brand not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Brand deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

module.exports = {
  fetchAllBrands,
  addBrand,
  editBrand,
  deleteBrand,
};
