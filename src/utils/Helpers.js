import Joi from '@hapi/joi';

/**
 * @class Helpers
 * @description Contains app-wide helper methods
 * @exports Helpers
 */
class Helpers {
  /**
   * @description Returns a json error response based on the provided parameters
   * @param {Object} res - Response object
   * @param {Number} status - Error status code
   * @param {String} error - The error message
   * @returns {JSON} JSON API response
   */
  static async errorResponse(res, status, error) {
    return res.status(status).json({ status, error });
  }

  /**
   * @description Returns a json success response based on the provided parameters
   * @param {Object} res - Response object
   * @param {integer} status - Success status code
   * @param {Object} data - The response data
   * @param {Object} pagination - Pagination details
   * @returns {JSON} JSON API response
   */
  static successResponse(res, status, data, pagination = undefined) {
    return res.status(status).json({ status, data, pagination });
  }

  /**
   * @description Validates an object based on the provided schema
   * @param {Object} object - The object to be validated
   * @param {Object} schema - The schema for the object
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next function to pass control to the next middleware
   * @returns {JSON} JSON API response
   */
  static validate(object, schema, req, res, next) {
    const { error, value } = Joi.validate(object, schema, {
      abortEarly: false,
    });

    if (error) {
      return Helpers.errorResponse(
        res,
        400,
        error.details.map(detail => {
          const message = detail.message.replace(/"/gi, '');
          return message;
        }),
      );
    }
    req.body = value;
    return next();
  }
}

export default Helpers;
