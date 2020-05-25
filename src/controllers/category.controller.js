const categoryService = require('../services/category.service');

module.exports = {
  getCategories: async (req, res, next) => {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).send(categories);
    } catch (e) {
      next(e);
    }
  },
  postCategory: async (req, res, next) => {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).send(category);
    } catch (e) {
      next(e);
    }
  },
  patchCategory: async (req, res, next) => {
    try {
      const category = await categoryService.updateCategory(
        req.params.id,
        req.body
      );
      res.status(200).send(category);
    } catch (e) {
      next(e);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      await categoryService.deleteCategory(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  getCategory: async (req, res, next) => {
    try {
      const category = await categoryService.getCategory(req.params.id);
      res.status(200).send(category);
    } catch (e) {
      next(e);
    }
  }
};
