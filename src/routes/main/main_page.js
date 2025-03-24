import { Router } from 'express';

export default function setupApiRoutes(app, basePath) {
  const router = Router();

  router.get('/', (req, res) => {
    res.json({ message: 'API root' });
  });

  app.use(basePath, router);
}