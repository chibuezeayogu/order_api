import { StatusCodes } from 'http-status-codes';

const { NOT_FOUND, OK, CREATED, UNPROCESSABLE_ENTITY } = StatusCodes;

/**
 * Return a json response with created order and 200 status code
 *
 * @param {Response} res 
 * @param {FirebaseFirestore.DocumentData} order
 * 
 * @returns {Response} created order
 */
export const resourceCreated = (res, order) => {
  res
    .status(CREATED)
    .json({
      success: true,
      message: `Order created successfully`,
      data: order
    })
}

/**
 * Return a json response with not found order Id and 404 status code
 *
 * @param {Response} res 
 * @param {any} orderId
 * 
 * @returns {Response} not found error message
 */
export const resourceNotFound = (res, orderId) => {
  res
    .status(NOT_FOUND)
    .json({
      success: false,
      message: `Order with Id=${orderId} not found`
    })
}

/**
 * Return a json response with orders/order and 200 status code
 *
 * @param {Response} res 
 * @param {FirebaseFirestore.DocumentData} orderId
 * @param {string} message
 * 
 * @returns {Response} orders/order
 */
export const resourceSuccess = (res, orders, message = '') => {
  let data = { success: true, data: orders };
  if (message !== '') {
    data['message'] = message;
  }
  res
    .status(OK)
    .json(data);
}

/**
 * Return json response with vaoidation error and 422 status code
 * @param {Response} res 
 * @param {Array} error
 * 
 * @returns {Response} vaidation errors
 */

export const validationError = (res, error) => {
  res
    .status(UNPROCESSABLE_ENTITY)
    .json({
      success: false,
      message: error
    })
}
