import { luhnCheck } from '../src/validators/luhn';

describe('luhnCheck', () => {
  // Known valid card numbers (these pass Luhn)
  it('returns true for a valid Visa number', () => {
    expect(luhnCheck('4532015112830366')).toBe(true);
  });

  it('returns true for a valid Mastercard number', () => {
    expect(luhnCheck('5425233430109903')).toBe(true);
  });

  it('returns true for a valid Amex number', () => {
    expect(luhnCheck('378282246310005')).toBe(true);
  });

  // Known invalid numbers
  it('returns false when a digit is altered', () => {
    expect(luhnCheck('4532015112830367')).toBe(false);
  });

  it('returns false for a number with a bad check digit', () => {
    // Valid Visa with last digit changed
    expect(luhnCheck('4532015112830361')).toBe(false);
  });

  it('returns true for a single digit 0 (trivially satisfies Luhn)', () => {
    // 0 % 10 === 0, so Luhn passes — this is mathematically correct
    expect(luhnCheck('0')).toBe(true);
  });

  it('returns true for the canonical Luhn test number', () => {
    // 79927398713 is the classic example from the Luhn spec
    expect(luhnCheck('79927398713')).toBe(true);
  });

  it('returns false for the canonical Luhn test number with wrong check digit', () => {
    expect(luhnCheck('79927398710')).toBe(false);
  });
});
