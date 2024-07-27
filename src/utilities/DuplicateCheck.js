export const duplicateCheck = (slice, product) => {
  return slice?.some((item) => item.id === product.id);
};
