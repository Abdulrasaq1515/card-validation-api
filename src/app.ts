import express from 'express';
import cardRoutes from './routes/card.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/v1/cards', cardRoutes);

// 404 handler for unmatched routes
app.use((_req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'The requested route does not exist',
  });
});

app.use(errorHandler);

export default app;
