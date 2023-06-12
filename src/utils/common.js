/**
 * Get user from local storage
 */
export const getUserLS = () => {
  const oldUser = localStorage.getItem('user') || '{}';
  let parsedUser;
  try {
    parsedUser = JSON.parse(oldUser);
  } catch (e) {}
  return parsedUser || {};
};

/**
 * Update user to local storage
 * @param user
 */
export const updateUserLS = (user) => {
  const oldUser = getUserLS();
  localStorage.setItem('user', JSON.stringify({ ...oldUser, ...user }));
};

/**
 * Remove user from local storage
 * @param user
 */
export const removeUserLS = () => {
  localStorage.removeItem('user');
};

export const formatCompare = (name) => {
  if (!name) return '';

  return (
    name
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/đ/g, 'd~')
      // eslint-disable-next-line no-useless-escape
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z `~!@#$%^&*(),.?'":;{}+=|<>_\-\\\/\[\]])/g, '')
  );
};

/**
 * Format quantity
 *
 * @param quantity Quantity
 * @param isAllowEmpty Allow show empty string
 */
export const formatQuantity = (quantity, isAllowEmpty = false) => {
  if (!quantity) {
    return isAllowEmpty ? '' : 0;
  }
  const quantityTemp = Number(quantity);

  return quantityTemp && quantityTemp < 10 ? `0${quantityTemp}` : quantityTemp;
};

/**
 * Get Cart from local storage
 */
export const getCartLS = () => {
  const oldData = localStorage.getItem('cart') || '{}';
  let parsedData;
  try {
    parsedData = JSON.parse(oldData);
  } catch (e) {}
  return parsedData || {};
};

/**
 * Update Cart to local storage
 */
export const updateCartLS = (data) => {
  const oldData = getCartLS();

  if (JSON.stringify(oldData) === '{}') {
    const newData = [data];
    localStorage.setItem('cart', JSON.stringify(newData));
  } else {
    const productHasInCart = oldData.find(({ id }) => id === data.id);
    if (!productHasInCart) {
      const newData = [...oldData, data];
      localStorage.setItem('cart', JSON.stringify(newData));
    } else {
      const newData = oldData.map((item) =>
        item.id === productHasInCart.id
          ? { ...productHasInCart, quantity: productHasInCart.quantity + data.quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newData));
    }
  }
};

/**
 * update CartItem local storage
 */
export const updateCartItem = (cartItem) => {
  const oldData = getCartLS();
  const newData = oldData.map((item) => (item.id === cartItem.id ? cartItem : item));
  localStorage.setItem('cart', JSON.stringify(newData));
};

/**
 * remove Cart to local storage
 */
export const removeCartLS = (idCart) => {
  const oldData = getCartLS();
  const newData = oldData.filter(({ id }) => id !== idCart);
  localStorage.setItem('cart', JSON.stringify(newData));
};
