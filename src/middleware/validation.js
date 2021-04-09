import { StatusCodes } from 'http-status-codes'
import createError from 'http-errors'
import { check, validationResult } from 'express-validator';
import { validationError } from '../helpers/responseHandler';
import { adminFirebase } from '../config/db'

const { UNAUTHORIZED, UNPROCESSABLE_ENTITY } = StatusCodes;
/**
 * Return a json reponse with validation error if any
 * else returns next function
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 *  
 * @returns {Error | NextFunction} 
 */
export const inputValidationResult = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return validationError(res, error.array());
  } 
    
  return next();
}
/**
 * Validation rules for record update
 */
export const updateInputValidator =
[
  check('title', "Title is required").notEmpty(),
  check('bookingDate', 'bookingDate is required').notEmpty(),
]

/**
 * Validation rules for record creation
 */
export const postInputValidator = 
  [
    ...updateInputValidator,
    check('address', 'Address details is required').notEmpty(),
    check('customer', 'Customer details is required').notEmpty()
  ]

export const authorizeUser = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization.split(' ')[1] // Bearer + token
    return adminFirebase
      .auth()
      .verifyIdToken(token)
      .then((user) => {
        req.user = user;
        return next();
      }).catch((error) => {
        res.status(UNPROCESSABLE_ENTITY)
        next(createError(UNPROCESSABLE_ENTITY, error));
      });
  }
  res.status(UNAUTHORIZED)
  return next(createError(UNAUTHORIZED, 'User is not authorised to view this resource'))
} 
