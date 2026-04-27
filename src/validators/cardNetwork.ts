/**
 * Card network detection based on IIN (Issuer Identification Number) prefix
 * and card length rules defined by each network.
 *
 * Rules sourced from ISO/IEC 7812 and card network specifications.
 */

interface NetworkRule {
  name: string;
  prefixes: RegExp;
  lengths: number[];
}

const NETWORK_RULES: NetworkRule[] = [
  {
    name: 'Amex',
    prefixes: /^3[47]/,
    lengths: [15],
  },
  {
    name: 'Mastercard',
    // 51-55 and 2221-2720
    prefixes: /^(5[1-5]|2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720))/,
    lengths: [16],
  },
  {
    name: 'Visa',
    prefixes: /^4/,
    lengths: [13, 16, 19],
  },
  {
    name: 'Discover',
    prefixes: /^(6011|65|64[4-9]|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5]))/,
    lengths: [16, 19],
  },
];

/**
 * Returns the card network name if the digits match a known network's
 * prefix and length rules, otherwise returns null.
 */
export function detectCardNetwork(digits: string): string | null {
  for (const rule of NETWORK_RULES) {
    if (rule.prefixes.test(digits) && rule.lengths.includes(digits.length)) {
      return rule.name;
    }
  }
  return null;
}
