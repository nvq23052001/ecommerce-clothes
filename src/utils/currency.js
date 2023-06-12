const currency = (price) => {
  return price
    ? new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    : '-';
};

export default currency;

/*
  ex: currency(100000) => 100.000 ₫
*/

export const priceRemoveVND = (price) => {
  return currency(price).replace(/,/g, '.').replace(/₫/g, '').replace(/\s/g, '');
};
