const express = require("express");
const brandsRouter = express();
const brandsController = require("../controller/brands.controller");
// get all brands
brandsRouter.get("/", brandsController.getAllBrands());

// get brand by id
brandsRouter.get("/:brand_id", brandsController.getBrandById());

// create brand
brandsRouter.post("/create", brandsController.createBrand());

// update brand
brandsRouter.put("/:brand_id/edite", brandsController.updateBrand());

// delete brand
brandsRouter.delete("/:brand_id/delete", brandsController.deleteBrand());

module.exports = brandsRouter;
