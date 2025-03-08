import { Router } from "express";
import * as eventController from '../controllers/events.controller'

const router = Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);

export default router;