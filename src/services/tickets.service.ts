import prisma from "../config/prisma";
import { HttpException } from "../errors/httpError";

export class TicketService {
  async bookTicket(userId: number, eventId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new HttpException(404, "User not found");

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new HttpException(404, "Event not found");
    if (event.date < new Date())
      throw new HttpException(400, "Cannot book past events");
    if (event.availableSeats <= 0) throw new HttpException(409, "Not available seats");

    await prisma.event.update({
      where: { id: eventId },
      data: { availableSeats: event.availableSeats - 1 }
    });

    return prisma.ticket.create({
      data: {
        userId,
        eventId,
      }
    });
  }

  async cancelBooking(ticketId: number) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { event: true }
    });
    if (!ticket) throw new HttpException(404, "Ticket not found");
    if (ticket.event.date < new Date())
      throw new HttpException(400, "Cannot cancel past events");

    await prisma.event.update({
      where: { id: ticket.event.id },
      data: { availableSeats: ticket.event.availableSeats + 1 }
    });

    await prisma.ticket.delete({ where: { id: ticketId } });
  }
}