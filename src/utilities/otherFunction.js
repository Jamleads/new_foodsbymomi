import { errorToast, successToast } from "./ToastMessage";

export const handleCopy = (identifier) => {
  const textToCopy = document.querySelector(`.${identifier}`).innerText;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      successToast("Text copied successfully");
    })
    .catch((err) => {
      errorToast("Failed to copy text: ", err);
    });
};
