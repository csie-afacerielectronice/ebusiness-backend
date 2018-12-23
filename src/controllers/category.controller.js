const yup = require('yup');
const categoryService = require('../services/category.service');
const errorHandler = require('../utils/errorHandler');

const postSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const updateSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string()
});

module.exports = {
  getCategories: async (req, res, next) => {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).send(categories);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  postCategory: async (req, res, next) => {
    try {
      await postSchema.validate(req.body);
      const category = await categoryService.createCategory(req.body);
      res.status(201).send(category);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  patchCategory: async (req, res, next) => {
    try {
      await updateSchema.validate(req.body);
      const category = await categoryService.updateCategory(
        req.params.id,
        req.body
      );
      res.status(200).send(category);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      await categoryService.deleteCategory(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  getCategory: async (req, res, next) => {
    try {
      const category = await categoryService.getCategory(req.params.id);
      res.status(200).send(category);
    } catch (e) {
      errorHandler(e, next);
    }
  }
};
