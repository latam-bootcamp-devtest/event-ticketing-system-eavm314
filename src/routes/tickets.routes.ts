import { Router } from "express";
import * as ticketsController from '../controllers/tickets.controller'

const router = Router();

router.post('/', ticketsController.bookTicket);
router.delete('/:ticketId', ticketsController.cancelBooking);
// router.get('/', ticketsController.getEvents);

export default router;