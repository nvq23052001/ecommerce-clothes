export const validateEmail = () => /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const validatePhoneNumber = () => /^\+?[0-9]{3}-?[0-9]{6,12}$/;

export const validateTypingNumber = (e) => /^[0-9]*$/.test(e.target.value);

export const validateTypingNumberFull = (e) => {
  const value = e.target.value;

  if (value === '') return true;
  if (value?.[0] === '0') return false;
  return validateTypingNumber(e);
};
