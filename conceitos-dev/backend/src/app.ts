import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { isUuid } from 'uuidv4';

import { ValidateProjectID } from './@types/Project';

const app: Application = express();
app.use(express.json());
app.use(cors());

import routes from './routes';

function validateProjectId(
  request: Request & ValidateProjectID, 
  response: Response, 
  next: NextFunction
): any {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({
      error: 'Invalid project ID.'
    });
  }

  next();
}

app.use('/projects/:id', validateProjectId);

app.use(routes);

export default app;
