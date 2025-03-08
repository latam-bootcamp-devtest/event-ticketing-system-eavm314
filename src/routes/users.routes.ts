import { Router } from "express";
import * as usersController from '../controllers/users.controller'
import { validateGetBookingHistory } from "../middlewares/validations";

const router = Router();

router.get('/:userId/tickets', validateGetBookingHistory, usersController.getBookingHistory);

export default router;