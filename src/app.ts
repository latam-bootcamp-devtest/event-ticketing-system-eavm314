import express from "express"
import eventRouter from "./routes/event.routes";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/events', eventRouter);

export default app;