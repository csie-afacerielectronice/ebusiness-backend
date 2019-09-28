const { NOT_FOUND } = require('./errors');

class ServiceHelper {
  constructor(model) {
    this.model = model;
  }

  async save(data) {
    return await this.model.create({ ...data });
  }

  async update(id, data, query = {}) {
    const object = await this.model.findOne({ where: { id, ...query } });
    if (!object) {
      NOT_FOUND();
    }
    return await object.update({
      ...data
    });
  }

  async find(id, query = {}) {
    const object = await this.model.findOne({ where: { id, ...query } });
    if (!object) {
      NOT_FOUND();
    }
    return object;
  }

  async get(query = {}) {
    return await this.model.findAll({ where: { ...query } });
  }

  async destroy(id, query = {}) {
    const object = await this.model.findOne({ where: { id, ...query } });
    if (!object) {
      NOT_FOUND();
    }
    await object.destroy();
  }
}

module.exports = ServiceHelper;
