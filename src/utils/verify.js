
export function verifyPhone(value) {
  return /^1[3-9][0-9]{9}$/.test(value);
}

export function verifyPassword(value) {
  return /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/.test(value);
}

export function verifyCode(value) {
  return /^[0-9a-zA-Z]{6}$/.test(value);
}