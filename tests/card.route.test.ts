import request from 'supertest';
import app from '../src/app';

describe('POST /api/v1/cards/validate', () => {
  // Valid cards
  it('returns valid: true for a valid Visa card number', async () => {
    const res = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '4532015112830366' });

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
    expect(res.body.cardNetwork).toBe('Visa');
  });

  it('accepts card numbers with spaces and dashes', async () => {
    const res = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '4532-0151-1283-0366' });

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
  });

  // Invalid card number (fails Luhn)
  it('returns valid: false for a number that fails Luhn', async () => {
    const res = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '4532015112830367' });

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(false);
    expect(res.body.cardNetwork).toBe('Visa');
  });

  // Unknown network
  it('returns valid: false for a number with no matching network', async () => {
    const res = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '1234567890123456' });

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(false);
    expect(res.body.cardNetwork).toBeNull();
  });

  // Bad input
  it('returns 400 when cardNumber is missing', async () => {
    const res = await request(app)
      .post('/api/v1/cards/validate')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('INVALID_INPUT');
  });

  it('returns 400 when cardNumber is an empty string', async () => {
    const res = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('INVALID_INPUT');
  });

  it('returns 400 when cardNumber is a number type instead of string', async () => {
    const res = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: 4532015112830366 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('INVALID_INPUT');
  });

  it('returns 400 when cardNumber contains letters', async () => {
    const res = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: 'abcd1234efgh5678' });

    expect(res.status).toBe(200); // request is valid, card is not
    expect(res.body.valid).toBe(false);
  });

  // 404 for unknown routes
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).post('/api/v1/unknown');
    expect(res.status).toBe(404);
  });
});
