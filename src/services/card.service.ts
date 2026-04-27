import { luhnCheck } from '../validators/luhn';
import { detectCardNetwork } from '../validators/cardNetwork';
import { ValidateCardResponse } from '../types/card.types';

/**
 * Sanitizes input by stripping spaces and dashes — common formatting
 * characters users include when typing card numbers.
 */
function sanitize(cardNumber: string): string {
  return cardNumber.replace(/[\s-]/g, '');
}

/**
 * Validates a card number by:
 * 1. Sanitizing formatting characters
 * 2. Ensuring the result contains only digits
 * 3. Detecting the card network via prefix + length rules
 * 4. Running the Luhn checksum
 */
export function validateCard(cardNumber: string): ValidateCardResponse {
  const digits = sanitize(cardNumber);

  if (!/^\d+$/.test(digits)) {
    return {
      valid: false,
      cardNetwork: null,
      message: 'Card number must contain digits only',
    };
  }

  const cardNetwork = detectCardNetwork(digits);

  if (!cardNetwork) {
    return {
      valid: false,
      cardNetwork: null,
      message: 'Card number does not match any known card network format',
    };
  }

  const isLuhnValid = luhnCheck(digits);

  return {
    valid: isLuhnValid,
    cardNetwork,
    message: isLuhnValid
      ? 'Card number is valid'
      : 'Card number fails Luhn check',
  };
}
