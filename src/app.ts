import express from "express"
import eventRouter from "./routes/event.routes";
import ticketsRouter from "./routes/tickets.routes"

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/events', eventRouter);
app.use('/tickets', ticketsRouter);

export default app;