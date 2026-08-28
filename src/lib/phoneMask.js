export const PHONE_PREFIX = "+995 ";

export function formatGeorgianPhone(rawInput) {
  const digits = rawInput.replace(/\D/g, "");

  if (digits.length <= 3) {
    return PHONE_PREFIX;
  }

  const localDigits = digits.slice(3, 12);

  let formatted = PHONE_PREFIX;
  if (localDigits.length > 0) formatted += localDigits.slice(0, 3);
  if (localDigits.length > 3) formatted += " " + localDigits.slice(3, 5);
  if (localDigits.length > 5) formatted += "-" + localDigits.slice(5, 7);
  if (localDigits.length > 7) formatted += "-" + localDigits.slice(7, 9);

  return formatted;
}

export function isPhoneComplete(formattedPhone) {
  return formattedPhone.replace(/\D/g, "").length >= 12;
}
