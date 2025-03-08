import express from "express"
import eventRouter from "./routes/events.routes";
import ticketsRouter from "./routes/tickets.routes"
import usersRouter from './routes/users.routes'

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/events', eventRouter);
app.use('/tickets', ticketsRouter);
app.use('/users', usersRouter);

export default app;