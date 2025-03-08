import { Request, Response } from "express";
import { TicketService } from "../services/tickets.service";
import { HttpException } from "../errors/httpError";

const ticketService = new TicketService();

export const bookTicket = async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.body;
    const newticket = await ticketService.bookTicket(userId, eventId);
    res.status(201).json(newticket);
  } catch (err: any) {
    console.error(err);
    if (err.name === "HttpException") {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Error booking ticker' });
    }
  }
}

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const ticketId = Number(req.params.ticketId);
    await ticketService.cancelBooking(ticketId);
    res.status(204).send({});
  } catch (err: any) {
    console.error(err);
    if (err.name === "HttpException") {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Error canceling ticket' });
    }
  }
}