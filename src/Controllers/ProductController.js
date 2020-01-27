import { errorResponse, successResponse } from '../utils';
import models from '../database/models';

/**
 * @class ProductController
 * @description Contains product related methods.
 * @exports ProductController
 */
class ProductController {
  /**
   * @method getAllProducts
   * @description Fetches all products
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {JSON} JSON API response
   */
  static async getAllProducts(req, res) {
    const products = await models.Product.findAll({
      attributes: ['id', 'name', 'price'],
    });
    return successResponse(res, 200, products);
  }

  /**
   * @method getProductById
   * @description Fetches a product by ID
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {JSON} JSON API response
   */
  static async getProductById(req, res) {
    const product = await models.Product.findByPk(req.params.id, {
      attributes: [
        'id',
        'name',
        'description',
        'price',
        'category',
        'image',
        'color',
      ],
    });

    if (!product) {
      return errorResponse(
        res,
        404,
        `Product with id: ${req.params.id} not found`,
      );
    }
    return successResponse(res, 200, product);
  }

  /**
   * @method createProduct
   * @description creates a new product
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {JSON} JSON API response
   */
  static async createProduct(req, res) {
    const product = await models.Product.create({
      ...req.body,
    });

    return successResponse(res, 201, product);
  }
}

export default ProductController;
