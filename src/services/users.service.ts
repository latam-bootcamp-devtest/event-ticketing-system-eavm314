import prisma from "../config/prisma";

export class UserService {
  async getBookingHistory(
    userId: number,
    page: number, pageSize: number,
    startDate: Date, endDate: Date,
    sort: 'asc' | 'desc',
    search?: string
  ) {
    const totalPromise = prisma.ticket.count({
      where: {
        userId,
        event: {
          date: {
            lte: endDate,
            gte: startDate,
          },
          name: {
            contains: search,
          }
        }
      },
    });

    const bookingsPromise = prisma.ticket.findMany({
      where: {
        userId,
        event: {
          date: {
            lte: endDate,
            gte: startDate,
          },
          name: {
            contains: search,
          }
        }
      },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            date: true,
          }
        }
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        event: {
          date: sort
        }
      }
    });

    const [bookings, total] = await Promise.all([bookingsPromise, totalPromise]);
    return {
      bookings,
      total,
      totalPages: Math.ceil(total/pageSize),
    }
  }
}