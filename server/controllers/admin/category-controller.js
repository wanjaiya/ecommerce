const categoryModel = require("../../models/Category");

//fetch all categories
const fetchAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ published: true });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

// Add Category
const addCategory = async (req, res) => {
  try {
    const { title } = req.body;
    //Check if category exists

    const newCategory = new categoryModel({
      title,
      published: true,
    });

    await newCategory.save();

    res.status(200).json({
      success: true,
      message: "Category saved",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { title: title },
      {
        new: true,
      }
    );
    if (!category) {
      res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted",
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
  fetchAllCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
