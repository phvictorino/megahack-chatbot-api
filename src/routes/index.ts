import { Router } from 'express';

import toolsRouter from './tools.routes';

const routes = Router();

routes.use('/chatbot', toolsRouter);

export default routes;
