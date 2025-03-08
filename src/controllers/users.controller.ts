import { Request, Response } from "express";
import { UserService } from "../services/users.service";

const usersService = new UserService();

export const getBookingHistory = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const startDate = new Date(req.query.startDate as string);
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();
    const sort = req.query.sort as ('asc' | 'desc') || 'desc';
    const search = req.query.search as string;

    const { bookings, totalPages } = await usersService.getBookingHistory(
      userId,
      page,
      pageSize,
      startDate,
      endDate,
      sort,
      search
    );

    const formattedBookings = bookings.map(b => ({
      ticketId: b.id,
      userId: b.userId,
      eventId: b.eventId,
      name: b.event.name,
      date: b.event.date,
    }))

    res.status(200).json({
      currentPage: page,
      pageSize,
      totalPages,
      events: formattedBookings,
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