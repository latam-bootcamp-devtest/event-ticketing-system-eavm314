import { Router } from "express";
import * as usersController from '../controllers/users.controller'

const router = Router();

router.get('/:userId/tickets', usersController.getBookingHistory);

export default router;