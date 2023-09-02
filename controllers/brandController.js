const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { brand_name, brand_logo, description, url } = req.body;
    const brand = await Brand.create({
      brand_name,
      brand_logo,
      description,
      url,
    });
    return res.json(brand);
  }
  async getAll(req, res) {
    const brands = await Brands.findAll();
    return res.json(brands);
  }
}

module.exports = new BrandController();
