import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export class EventService {
  async createEvent(event: Prisma.EventCreateInput) {
    return prisma.event.create({ data: {
      ...event,
      date: new Date(event.date).toISOString(),
    } });
  }
}