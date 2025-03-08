import { Request, Response } from "express";
import { TicketService } from "../services/tickets.service";

const ticketService = new TicketService();

export const bookTicket = async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.body;
    const newticket = await ticketService.bookTicket(userId, eventId);
    res.status(201).json(newticket);
  } catch (err: any) {
    if (err.name === "HttpException") {
      res.status(err.code).json({ message: err.message })
    } else {
      console.error(err);
      res.status(500).json({ message: 'Error booking ticket' });
    }
  }
}

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const ticketId = Number(req.params.ticketId);
    await ticketService.cancelBooking(ticketId);
    res.status(204).send({});
  } catch (err: any) {
    if (err.name === "HttpException") {
      res.status(err.code).json({ message: err.message })
    } else {
      console.error(err);
      res.status(500).json({ message: 'Error canceling booking' });
    }
  }
}