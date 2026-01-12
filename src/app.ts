import express from 'express';

export const app = express();

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/teste', (req: express.Request, res: express.Response) => {
  res.json({message: 'Testando rota de teste com hot reload"'});
});

