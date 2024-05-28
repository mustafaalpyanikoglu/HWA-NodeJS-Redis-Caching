const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware.index');

const PlanetsController = require('../controllers/planets.controller');

const cache = middleware.cache;
const { debugReq } = middleware.logs;

/**
 * GET /api/planets
 */
router.get('/', cache(300), debugReq, PlanetsController.getPlanets);
/**
 * GET /api/planets/:id
 */
router.get('/:id', cache(300), debugReq, PlanetsController.getPlanetById);

module.exports = router;