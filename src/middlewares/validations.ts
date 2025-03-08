import { Request, Response, NextFunction } from "express";
import { body, param, query, validationResult } from 'express-validator'

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
  body('date').isDate({ format: 'YYYY-MM-DD' }).withMessage("Date must have YYYY-MM-DD format")
    .custom(value => new Date(value) > new Date())
    .withMessage('Date must be a future date'),
  body('availableSeats').isInt({ gt: 0 }).withMessage('The available seats must be a positive integer'),
  validationResponse,
]

export const validateGetEvents = [
  query('page').optional().isInt({ gt: 0 }).withMessage('The page number must be a positive integer'),
  query('pageSize').optional().isInt({ gt: 0 }).withMessage('The page size must be a positive integer'),
  validationResponse,
]

export const validateBookEvent = [
  body('userId').isInt({ gt: 0 }).withMessage('The User ID must be a positive integer'),
  body('eventId').isInt({ gt: 0 }).withMessage('The Event ID must be a positive integer'),
  validationResponse,
]

export const validateCancelBook = [
  param('ticketId').isInt({ gt: 0 }).withMessage('The Ticket ID must be a positive integer'),
  validationResponse,
]

export const validateGetBookingHistory = [
  param('userId').isInt({ gt: 0 }).withMessage('The User ID must be a positive integer'),
  query('page').optional().isInt({ gt: 0 }).withMessage('The page number must be a positive integer'),
  query('pageSize').optional().isInt({ gt: 0 }).withMessage('The page size must be a positive integer'),
  query('sort').optional().isIn(['asc', 'desc']).withMessage("Sort key should be whether 'asc' or 'desc'"),
  query('search').optional().isString().withMessage("Search key should be a valid string"),
  query('startDate').isDate({ format: 'YYYY-MM-DD' }).withMessage("Start Date must have YYYY-MM-DD format")
    .custom(value => new Date(value) < new Date())
    .withMessage('Start Date must be a past date'),
  query('endDate').optional().isDate({ format: 'YYYY-MM-DD' }).withMessage("End Date must have YYYY-MM-DD format")
    .custom((value, { req }) => (new Date(value) > new Date(req.query!.startDate)) && (new Date(value) < new Date()))
    .withMessage("End Date must be a past date and later than 'startDate'"),
  validationResponse,
]