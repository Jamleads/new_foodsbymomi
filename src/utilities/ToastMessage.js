import { toast } from "react-toastify";
export const successToast = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
  });
};
export const infoToast = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
  });
};
export const errorToast = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
  });
};
export const warnToast = (message) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
  });
};
