import { Request, Response } from 'express';

import createUser from './services/createUser';

export function hello(request: Request, response: Response) {
  const user = createUser({
    email: 'bruno@demasi.com', 
    password: '123456',
    techs: [
      'Node.js', 
      'React', 
      'Postgres', 
      { title: 'Redis', experience: 2}
    ]
  });


  return response.json({ message: 'Hello user', user })
}