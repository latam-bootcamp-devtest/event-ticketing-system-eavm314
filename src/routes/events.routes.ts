import { Router } from "express";
import * as eventController from '../controllers/events.controller'
import { validateCreateEvent } from "../middlewares/validations";

const router = Router();

router.post('/', validateCreateEvent, eventController.createEvent);
router.get('/', eventController.getEvents);

export default router;