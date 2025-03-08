import { Router } from "express";
import * as ticketsController from '../controllers/tickets.controller'
import { validateBookEvent, validateCancelBook } from "../middlewares/validations";

const router = Router();

router.post('/', validateBookEvent, ticketsController.bookTicket);
router.delete('/:ticketId', validateCancelBook, ticketsController.cancelBooking);
// router.get('/', ticketsController.getEvents);

export default router;