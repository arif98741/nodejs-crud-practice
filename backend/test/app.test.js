//import request from 'supertest';
import app from '../server';  // Adjust the path based on your actual server file

describe('GET /api/v1/hello', () => {
  it('should return a message from the API', async () => {
    const response = await request(app).get('/api/v1/hello');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, API v1!');
  });
});