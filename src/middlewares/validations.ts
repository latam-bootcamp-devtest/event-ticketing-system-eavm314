import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator'

const validationResponse = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    res.status(400).json({
      message: 'Error validating data',
      errors: result.array(),
    })
  }
}

export const validateCreateEvent = [
  body('name').isString().withMessage('Name must be a valid string'),
  body('date').isDate({format: 'YYYY-MM-DD'})
  .custom(value => new Date(value) > new Date())
  .withMessage('Date must be a future date with YYYY-MM-DD format'),
  body('availableSeats').isInt({ gt: 0 }).withMessage('The available seats must be a positive integer'),
  validationResponse,
]