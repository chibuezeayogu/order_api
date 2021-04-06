import { check, validationResult } from 'express-validator';
import { validationError } from '../helpers/responseHandler';

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

