import { rest } from 'msw'

const users = [{ name: 'Juan' }, { name: 'Pedro' }];

export const handlers = [
  rest.get('/list', (req, res, ctx) => {
    return res(ctx.json([...users]));
  }),
  rest.post('/list', async(req, res, ctx) => {
    const user = JSON.parse(req.body);
    users.push(user);

    return res(ctx.json(user));
  })
]
