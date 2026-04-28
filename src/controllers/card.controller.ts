import { Request, Response } from 'express';
import { validateCard } from '../services/card.service';
import { ValidateCardRequest } from '../types/card.types';

/**
 * POST /api/v1/cards/validate
 *
 * Accepts a cardNumber string and returns a validation result.
 * Returns 400 for missing or malformed input.
 * Returns 200 for all valid requests — even when the card is invalid,
 * because the HTTP request itself succeeded.
 */
export function validateCardController(req: Request, res: Response): void {
  const body = req.body as Partial<ValidateCardRequest>;
  const { cardNumber } = body;

  if (cardNumber === undefined || cardNumber === null) {
    res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'cardNumber is required',
    });
    return;
  }

  if (typeof cardNumber !== 'string' || cardNumber.trim() === '') {
    res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'cardNumber must be a non-empty string',
    });
    return;
  }

  const result = validateCard(cardNumber);
  res.status(200).json(result);
}
