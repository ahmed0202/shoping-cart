const brandsModel = require("../model/brands.model");
const brandsValidation = require("../validation/brands.validation");
class BrandsController {
  getAllBrands = () => async (req, res) => {
    const data = await brandsModel.getAllBrands();
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  getBrandById = () => async (req, res) => {
    const brand_id = req.params;
    const validate = brandsValidation.validateBrandId(brand_id);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await brandsModel.getBrandById(brand_id);
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  createBrand = () => async (req, res) => {
    const body = req.body;
    const validate = brandsValidation.validateBrand(body);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await brandsModel.createBrand(body);
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  updateBrand = () => async (req, res) => {
    const { brand_name } = req.body;
    const { brand_id } = req.params;
    const body = { brand_name, brand_id };
    console.log(body);
    const validate = brandsValidation.validateBrand(body);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await brandsModel.updateBrand(body);
    if (data == 0) {
      return res.status(304).json({
        message: "no data modefied",
      });
    }
    const brand = await brandsModel.getBrandById(body.brand_id);
    if (brand.length == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({
      message: "success",
      brand,
    });
  };
  deleteBrand = () => async (req, res) => {
    const brand_id = req.params;

    const validate = brandsValidation.validateBrandId(brand_id);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await brandsModel.deleteBrand(brand_id);

    if (data == 0) {
      return res.status(404).json({
        message: "no data modefied",
      });
    }
    return res.status(200).json({
      message: "success",
    });
  };
}

module.exports = new BrandsController();
