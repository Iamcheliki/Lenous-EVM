export const calculatePnl = (
  amount: number,
  marketPrice: number,
  orderPrice: number
) => {
  return (marketPrice - orderPrice) * amount;
};

export const convertFrom18 = (number: number) => {
  return number / 10 ** 18;
};

export const convertFrom12 = (number: number) => {
  return number / 10 ** 12;
};

export const calculateAveEnt = (amount: number, totalPrice: number) => {
  return totalPrice / amount;
};
