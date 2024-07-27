export const countryPrice = (product, country) => {
  if (country === "Nigeria") {
    return product?.priceNgn;
  } else if (country === "Ghana") {
    return product?.priceGhana;
  } else if (country === "United Kingdom") {
    return product?.priceUk;
  } else if (country === "United States") {
    return product?.priceUs;
  } else if (country === "Canada") {
    return product?.priceCanada;
  } else {
    ("It is working");
  }
};
export const countryCurrency = (product, country) => {
  if (country === "Nigeria") {
    return product?.nigeriaCode;
  } else if (country === "Ghana") {
    return product?.ghanaCode;
  } else if (country === "United Kingdom") {
    return product?.ukCode;
  } else if (country === "United States") {
    return product?.usCode;
  } else if (country === "Canada") {
    return product?.canadaCode;
  } else product = "Allow location to see price";
};
