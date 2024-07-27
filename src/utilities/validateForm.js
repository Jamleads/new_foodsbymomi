export const validateForm = (formState) => {
  for (const key in formState) {
    if (formState[key].trim() === "") {
      return false;
    }
  }
  return true;
};
