const { Goods } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");

class GoodsController {
  async create(req, res, next) {
    try {
      const {
        good_name,
        article,
        price,
        brandId,
        typeId,
        // features,
        description,
        secret,
        storage,
      } = req.body;

      // Множественные изображения
      const { img } = req.files;
      const imageFileNames = [];

      // Обработка каждого изображения
      for (const image of Array.isArray(img) ? img : [img]) {
        const fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName));
        imageFileNames.push(fileName);
      }

      const good = await Goods.create({
        good_name,
        article,
        price,
        brandId,
        typeId,
        img: imageFileNames, // Сохранение имен файлов в массиве
        // features,
        description,
        secret,
        storage,
      });

      return res.json(good);
    } catch (e) {
      next(ApiError.badRequests(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 10;
      let offset = page * limit - limit;
      let goodsLet;
      if (!brandId && !typeId) {
        goodsLet = await Goods.findAndCountAll({ limit, offset });
      }
      if (brandId && !typeId) {
        goodsLet = await Goods.findAndCountAll({
          where: {
            brandId,
          },
          limit,
          offset,
        });
      }
      if (!brandId && typeId) {
        goodsLet = await Goods.findAndCountAll({
          where: {
            typeId,
          },
          limit,
          offset,
        });
      }
      if (brandId && typeId) {
        goodsLet = await Goods.findAndCountAll({
          where: {
            brandId,
            typeId,
          },
          limit,
          offset,
        });
      }
      return res.json(goodsLet);
    } catch (e) {
      next(ApiError.badRequests(e.message));
    }
  }

  async getOne(req, res) {
    // const { id } = req.;
    // const good = (await Goods.findOne()).where(Goods.options.id == id);
    // return res.json(good);
  }
}

module.exports = new GoodsController();
