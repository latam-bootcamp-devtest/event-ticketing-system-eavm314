import { Request, Response } from "express";
import { EventService } from "../services/events.service"

const eventService = new EventService();

export const createEvent = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newEvent = await eventService.createEvent(payload);
    res.status(201).json(newEvent);
  } catch (err: any) {
    if (err.name === "HttpException") {
      res.status(err.code).json({ message: err.message })
    } else {
      console.error(err);
      res.status(500).json({ message: 'Error booking ticket' });
    }
  }
}

export const getEvents = async(req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const {events, totalPages} = await eventService.getEvents(page, pageSize);
    res.status(200).json({
      currentPage: page,
      pageSize,
      totalPages,
      events,
    });
  } catch (err: any) {
    if (err.name === "HttpException") {
      res.status(err.code).json({ message: err.message })
    } else {
      console.error(err);
      res.status(500).json({ message: 'Error booking ticket' });
    }
  }
}