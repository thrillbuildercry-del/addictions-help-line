export const ONE_DECIMAL_REGEX = /^\d+(\.\d)?$/;

export function validateOneDecimal(value) {
  return ONE_DECIMAL_REGEX.test(String(value));
}
