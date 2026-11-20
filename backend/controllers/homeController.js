const Product = require("../models/product");

exports.getHomePage = async (req, res, next) => {
  try {
    console.log("Home API called");

    const category = req.query.category;
    const search = req.query.search?.trim();
    const allowedCategories = ['men', 'women', 'kids', 'home-living', 'beauty', 'studio'];

    let query = {};
    if (category && allowedCategories.includes(category)) {
      query.category = category;
    }
    if (search) {
      const pattern = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [{ title: pattern }, { description: pattern }];
    }

    const allProducts = await Product.find(query);

    console.log("Total products:", allProducts.length);

    res.status(200).json(allProducts);

  } catch (err) {
    console.log("Error while fetching products:", err);

    res.status(500).json({
      message: "Error while fetching products",
      error: err.message,
    });
  }
};