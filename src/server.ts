import express, { request } from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.post('/users', (resquest, response) => {

  const { name, email} = resquest.body;

  const user = {
     name,
     email,
  }

  return response.json(user);
});


app.listen(3333, () => {
  console.log('Server Start');
});
