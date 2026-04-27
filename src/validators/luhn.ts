/**
 * Validates a card number using the Luhn algorithm.
 *
 * The algorithm works by doubling every second digit from the right,
 * subtracting 9 from any result over 9, then summing all digits.
 * A valid card number produces a sum divisible by 10.
 *
 * @param digits - sanitized string of digits only
 */
export function luhnCheck(digits: string): boolean {
  let sum = 0;
  let shouldDouble = false;

  // Traverse from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
