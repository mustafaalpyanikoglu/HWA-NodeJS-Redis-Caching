const env = require('dotenv').config().parsed;
const redis = require('redis');
const shared = require('../shared/shared.index');
const { utils, models } = shared;
const { AppError } = models;
const { logger } = utils;

/**
 * Redis client
 * @type {RedisClient}
 */
const client = redis.createClient({
  url: env.REDIS_CLOUD_URL
});

/**
 * Log Redis errors
 * @param {Error} err - Error object
 * @returns {void}
 */
client.on('error', (err) => {
  logger.error('Redis error:', err);
  throw new AppError('Redis error: ' + err.message, 'REDIS_ERROR', 'cache.middleware.js');
});

/**
 * Connect to Redis
 * @param {Error} err - Error object
 * @returns {void}
 */
client.connect((err) => {
  if (err) {
    logger.error('Redis connection error:', err);
    throw new AppError('Redis connection error: ' + err.message, 'REDIS_ERROR', 'cache.middleware.js');
  }
  logger.info('Connected to Redis');
});

/**
 * Middleware for caching responses.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next function in the middleware chain
 * @param {number} duration - Cache duration in seconds
 * @param {boolean} bypassCache - Flag to bypass the cache
 * @returns {Promise<void>} - Handles caching asynchronously
 */
const cacheMiddleware = (duration, bypassCache = false) => async (req, res, next) => {
  // Bypass the cache if the flag is set
  if (bypassCache) return next();

  const cacheKey = req.originalUrl;

  const cachedResponse = await client.get(cacheKey);
  // If the response is cached, send it back
  if (cachedResponse) {
    console.log(`Fetched from Cache -> ${cacheKey}`);
    logger.log('info', `Fetched from Cache -> ${cacheKey}`)
    return res.send(JSON.parse(cachedResponse));
  } else {
    console.log(`Cache miss -> ${cacheKey}`);
    logger.log('info', `Cache miss -> ${cacheKey}`)
    const originalSend = res.send.bind(res);

    // Override the send method to cache the response
    res.send = async (body) => {
      const response = typeof body === 'string' ? body : JSON.stringify(body);
      await client.setEx(cacheKey, duration, response);

      console.log(`Added to Cache -> ${cacheKey}`);
      logger.log('info', `Added to Cache -> ${cacheKey}`)
      return originalSend(body);
    };
    next();
  }
};


module.exports = {
  /**
   * Cache middleware
   * @param {number} duration - Cache duration in seconds
   * @returns {Function} - Express middleware function
   * @example
   * router.get('/', cache(300), PlanetsController.getPlanets);
   */
  cacheMiddleware,
};