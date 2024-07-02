// userRepository.js
const User = require("../models/User");
const { Op } = require("sequelize");

const users = {
  getAll: async (options = {}) => {
    // Accept options object
    const { limit, offset, search } = options; // Extract limit and offset
    let where = {}; // Initialize where clause
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` }; // Add name search condition
    }
    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      where,
      order: [["createdAt", "ASC"]],
    });
    return { count, rows }; // Return count and rows
  },

  getById: async (id) => {
    return await User.findByPk(id);
  },

  create: async (userData) => {
    return await User.create(userData);
  },

  update: async (id, userData) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found"); // Or handle this in a more user-friendly way
    }
    return await user.update(userData);
  },

  delete: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return true;
  },
};

module.exports = users;
