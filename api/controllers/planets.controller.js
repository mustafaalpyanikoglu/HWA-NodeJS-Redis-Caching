const shared = require('../shared/shared.index');
const { models } = shared;
const { AppError } = models;

const axios = require('axios');

const getPlanets = async (req, res, next) => {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    if (!data || data.length === 0) {
      throw new AppError('Data not found!', 'NOT_FOUND', 'planets.controller.getPlanets');
    }
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

const getPlanetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!data) {
      throw new AppError('Data not found!', 'NOT_FOUND', 'planets.controller.getPlanetById');
    }
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPlanets,
  getPlanetById
};
