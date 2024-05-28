/**
 * Middleware express functions and configuration for security, logging, and error handling
 */

module.exports = middleware = {
  /** 
   * Middleware functions for automatic and custom logging
   */
  logs: require('./logs.middleware'),
  /**
   * Cache middleware
   */
  cache: require('./cache.middleware').cacheMiddleware,
  /** Middleware error handler that logs and responds to any error*/
  errorHandler: require('./error-handler.middleware'),
};
