import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);

routes.post('/users', (request, response) => {
  const { name, email } = request.body;

  const user = {
    name,
    email,
  };

  return response.json(user);
});

export default routes;
