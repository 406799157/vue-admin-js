
export function verifyPhone(value) {
  return /^1[3-9][0-9]{9}$/.test(value);
}

export function verifyPassword(value) {
  return true;
}