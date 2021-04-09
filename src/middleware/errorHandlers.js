import { config } from "dotenv";
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors'

config();
const nodeEnv = process.env.NODE_ENV;
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

/**
 * Return a json response with route not found error and 404 status code
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 * 
 * @returns {Response} not found error
 */
export const routeNotFound = (req, res, next) => {
  const error =  createError(404, `Route -> ${req.method}:${req.originalUrl} not found'`);
  res.status(NOT_FOUND);
  next(error);
};

/**
 * Return a json response with error message and 500 status code
 * 
 * @param {Error} error 
 * @param {Request} req 
 * @param {Response} res
 * 
 * @returns {Response} application error
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, _next) => {
  let statusCode

  if (error.status) {
    statusCode = error.status
  } else if (!res.status) {
    statusCode = INTERNAL_SERVER_ERROR
  } else {
    statusCode = res.status || INTERNAL_SERVER_ERROR
  }

  res
    .status(statusCode)
    .json({
      success: false,
      message: error.message,
      stack: nodeEnv !== 'prodection' ? error.stack : ''
    })
};
