import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export class EventService {
  async createEvent(event: Prisma.EventCreateInput) {
    return prisma.event.create({ data: {
      ...event,
      date: new Date(event.date).toISOString(),
    } });
  }

  async getEvents(page: number, pageSize: number) {
    const eventsPromise = prisma.event.findMany({
      where: {
        date: {
          gte: new Date()
        }
      },
      take: pageSize,
      skip: (page-1)*pageSize,
      orderBy: {
        date: 'asc'
      }
    });

    const totalPromise = prisma.event.count();
    const [events, total] = await Promise.all([eventsPromise, totalPromise]);
    return {
      events,
      total,
      totalPages: Math.ceil(total/pageSize),
    }
  }
}