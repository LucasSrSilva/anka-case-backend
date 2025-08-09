import request from 'supertest';
import { app } from '../src/app';

describe('Client routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /clients deve retornar 200', async () => {
    const res = await request(app.server).get('/clients');
    expect(res.statusCode).toBe(200);
  });
});
