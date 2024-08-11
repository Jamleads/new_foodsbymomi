import { errorToast } from "./ToastMessages";

export const reAuthenticate = (errorMessage) => {
  if (
    errorMessage == 500 ||
    errorMessage == 401 ||
    errorMessage == "Something went wrong!"
  ) {
    localStorage.removeItem("token");
    errorToast(errorMessage + "Login Again");
    window.location.reload();
  }
};
